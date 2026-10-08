/**
 * GARGANTUA: Relativistic Gravitational Lensing & Accretion Disk Engine
 * Scientifically inspired by Kip Thorne & Christopher Nolan's Interstellar.
 * Features:
 * - Pure event horizon shadow in center
 * - Razor-sharp photon sphere ring
 * - Relativistic Doppler beaming (approaching left side is brighter/hotter)
 * - Upper and lower gravitational lensing arcs (light bent from behind the singularity)
 * - Swirling Keplerian plasma filaments (inner matter orbits faster)
 * - Mouse-driven spacetime curvature and inclination tilt
 * - IntersectionObserver to pause rendering when out of viewport
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initGargantua);

  function initGargantua() {
    const canvas = document.getElementById('gargantua-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, centerX, centerY;
    let animId = null;
    let isVisible = true;

    // View & Spacetime parameters
    const baseRadius = 68; // Event horizon radius
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let time = 0;

    // Plasma Filaments in Accretion Disk
    const particleCount = 240;
    const particles = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height || 520;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      centerX = width / 2;
      centerY = height / 2;
    }

    // Initialize swirling relativistic particles
    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const rMin = baseRadius * 1.15;
        const rMax = baseRadius * 3.4;
        // Distribute with density higher near event horizon
        const radius = rMin + Math.pow(Math.random(), 1.6) * (rMax - rMin);
        particles.push({
          radius: radius,
          angle: Math.random() * Math.PI * 2,
          // Keplerian orbital velocity: inner orbits significantly faster (v ~ r^-1.5)
          speed: (0.045 * Math.pow(baseRadius / radius, 1.4)) * (0.8 + Math.random() * 0.4),
          size: 1.2 + Math.random() * 2.2,
          opacity: 0.35 + Math.random() * 0.65,
          hueOffset: (Math.random() - 0.5) * 15,
          radialDrift: (Math.random() - 0.5) * 0.15
        });
      }
    }

    // Mouse Interaction for Spacetime Tilting
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = mouseX * 0.45;
      targetTiltY = mouseY * 0.35;
    });

    canvas.addEventListener('mouseleave', () => {
      targetTiltX = 0;
      targetTiltY = 0;
    });

    // Render Loop
    function render() {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;
      tiltX += (targetTiltX - tiltX) * 0.05;
      tiltY += (targetTiltY - tiltY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep Space Cosmic Glow Behind Gargantua
      const cosmicGlow = ctx.createRadialGradient(
        centerX, centerY, baseRadius * 0.5,
        centerX, centerY, baseRadius * 4.5
      );
      cosmicGlow.addColorStop(0, 'rgba(234, 88, 12, 0.16)');
      cosmicGlow.addColorStop(0.35, 'rgba(180, 83, 9, 0.08)');
      cosmicGlow.addColorStop(0.7, 'rgba(56, 189, 248, 0.03)');
      cosmicGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cosmicGlow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(centerX, centerY);

      // 1. UPPER GRAVITATIONAL LENSING ARC (Light bent over the top from backside)
      drawGravitationalLensArc(true);

      // 2. LOWER GRAVITATIONAL LENSING ARC (Light bent under the bottom)
      drawGravitationalLensArc(false);

      // 3. BACKGROUND HALF OF ACCRETION DISK (Behind horizon)
      drawAccretionDisk(false);

      // 4. PHOTON SPHERE GLOW & BEAMING
      drawPhotonSphere();

      // 5. EVENT HORIZON SHADOW (Pure pitch-black central singularity)
      drawEventHorizon();

      // 6. FOREGROUND HALF OF ACCRETION DISK (In front of horizon)
      drawAccretionDisk(true);

      // 7. RELATIVISTIC INNER JET / CENTRAL PHOTON RING
      drawInnerPhotonRing();

      ctx.restore();

      animId = requestAnimationFrame(render);
    }

    /**
     * Gravitational Lensing Arcs (Bowed over top & under bottom)
     */
    function drawGravitationalLensArc(isTop) {
      ctx.save();
      const sign = isTop ? -1 : 1;
      const arcHeight = (baseRadius * 1.65) * (1 + sign * tiltY * 0.4);
      const arcWidth = baseRadius * 2.8;

      ctx.beginPath();
      // Outer arc curve
      ctx.ellipse(
        tiltX * 25,
        sign * (baseRadius * 0.85 + Math.abs(tiltY * 15)),
        arcWidth,
        arcHeight * 0.85,
        tiltX * 0.15,
        isTop ? Math.PI : 0,
        isTop ? 0 : Math.PI,
        !isTop
      );

      // Subtle volumetric gradient with Doppler beaming (left side brighter)
      const grad = ctx.createLinearGradient(-arcWidth, 0, arcWidth, 0);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.75)'); // Left: Doppler boosted white-hot
      grad.addColorStop(0.25, 'rgba(253, 224, 71, 0.8)'); // Bright yellow
      grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.65)'); // Fiery orange
      grad.addColorStop(0.85, 'rgba(194, 65, 12, 0.4)');  // Cooling red
      grad.addColorStop(1, 'rgba(124, 45, 18, 0.15)');   // Right: Dim Doppler shadow

      ctx.lineWidth = isTop ? 22 : 14;
      ctx.strokeStyle = grad;
      ctx.filter = 'blur(4px)';
      ctx.stroke();

      // Sharp inner core for the lens arc
      ctx.lineWidth = isTop ? 7 : 4;
      ctx.strokeStyle = 'rgba(255, 255, 240, 0.85)';
      ctx.filter = 'blur(1px)';
      ctx.stroke();

      ctx.restore();
    }

    /**
     * Accretion Disk: Flat equatorial swirling disk with particles
     */
    function drawAccretionDisk(isForeground) {
      ctx.save();
      ctx.rotate(tiltX * 0.25);

      const diskYScale = 0.28 + tiltY * 0.15; // Realistic inclination viewing angle
      const rInner = baseRadius * 1.18;
      const rOuter = baseRadius * 3.3;

      // Draw flowing plasma gradient ring
      ctx.beginPath();
      ctx.ellipse(0, 0, rOuter, rOuter * diskYScale, 0, 0, Math.PI * 2);
      ctx.ellipse(0, 0, rInner, rInner * diskYScale, 0, 0, Math.PI * 2, true);

      const diskGrad = ctx.createRadialGradient(0, 0, rInner, 0, 0, rOuter);
      diskGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)'); // Inner edge: ultra-hot white
      diskGrad.addColorStop(0.15, 'rgba(254, 240, 138, 0.85)'); // Hot yellow
      diskGrad.addColorStop(0.45, 'rgba(249, 115, 22, 0.65)'); // Orange plasma
      diskGrad.addColorStop(0.8, 'rgba(180, 83, 9, 0.35)'); // Outer cooling
      diskGrad.addColorStop(1, 'rgba(124, 45, 18, 0)');

      ctx.fillStyle = diskGrad;
      ctx.filter = 'blur(3px)';
      
      // Clip to foreground or background half
      ctx.save();
      ctx.beginPath();
      if (isForeground) {
        ctx.rect(-width, 0, width * 2, height); // Lower half is in front
      } else {
        ctx.rect(-width, -height, width * 2, height); // Upper half is in back
      }
      ctx.clip();
      ctx.fill();
      ctx.restore();

      // Render orbiting plasma filaments / particles
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;

        // Determine if particle is in foreground or background
        const inForeground = Math.sin(p.angle) >= 0;
        if (inForeground !== isForeground) continue;

        const px = Math.cos(p.angle) * p.radius;
        const py = Math.sin(p.angle) * (p.radius * diskYScale);

        // Relativistic Doppler Beaming: Left side (cos < 0) is approaching and brighter!
        const doppler = Math.max(0.2, 1.0 - Math.cos(p.angle) * 0.7);

        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.8 + doppler * 0.4), 0, Math.PI * 2);

        // Color shifts from yellow-white (approaching) to deep amber (receding)
        if (doppler > 1.1) {
          ctx.fillStyle = `rgba(255, 255, 240, ${p.opacity * doppler * 0.85})`;
        } else if (doppler > 0.7) {
          ctx.fillStyle = `rgba(253, 224, 71, ${p.opacity * doppler * 0.75})`;
        } else {
          ctx.fillStyle = `rgba(234, 88, 12, ${p.opacity * doppler * 0.6})`;
        }
        ctx.fill();
      }

      ctx.restore();
    }

    /**
     * Photon Sphere Glow
     */
    function drawPhotonSphere() {
      ctx.save();
      const r = baseRadius * 1.05;

      const photonGrad = ctx.createRadialGradient(
        tiltX * 10, tiltY * 10, baseRadius * 0.95,
        0, 0, r * 1.35
      );
      photonGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      photonGrad.addColorStop(0.3, 'rgba(254, 240, 138, 0.75)');
      photonGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
      photonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = photonGrad;
      ctx.fill();
      ctx.restore();
    }

    /**
     * Event Horizon: Pitch Black Sphere where no light escapes
     */
    function drawEventHorizon() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(tiltX * 8, tiltY * 6, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#020307';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();
    }

    /**
     * Razor-thin Photon Ring on the Event Horizon Rim
     */
    function drawInnerPhotonRing() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(tiltX * 8, tiltY * 6, baseRadius * 1.015, 0, Math.PI * 2);
      ctx.lineWidth = 1.8;

      // Asymmetric photon ring brightness
      const ringGrad = ctx.createLinearGradient(-baseRadius, 0, baseRadius, 0);
      ringGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      ringGrad.addColorStop(0.4, 'rgba(254, 240, 138, 0.85)');
      ringGrad.addColorStop(0.8, 'rgba(249, 115, 22, 0.5)');
      ringGrad.addColorStop(1, 'rgba(180, 83, 9, 0.25)');

      ctx.strokeStyle = ringGrad;
      ctx.stroke();
      ctx.restore();
    }

    // Performance: Pause loop when scrolled offscreen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      observer.observe(canvas);
    }

    // Init & Listeners
    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    resize();
    initParticles();
    render();
  }
})();
