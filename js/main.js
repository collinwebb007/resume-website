/**
 * Vintage CRT Terminal Logic (Model 8086)
 * Handles retro phosphor switching, scanlines, data binding, and terminal UI.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderSkills();
  renderExperience();
  renderProjects("all");
  renderEducation();
  renderContact();
  setupCrtControls();
  setupNavigation();
  setupScrollAnimations();
});

// ===================================================================
// HERO & IDENT RENDERING
// ===================================================================
function renderHero() {
  const p = resumeData.personal;
  if (!p) return;

  const titleEl = document.getElementById("hero-title");
  if (titleEl) titleEl.textContent = p.name.toUpperCase();

  const roleEl = document.getElementById("hero-role");
  if (roleEl) roleEl.textContent = p.role.toUpperCase();

  const taglineEl = document.getElementById("hero-tagline");
  if (taglineEl) taglineEl.textContent = p.tagline;

  const locEl = document.getElementById("hero-location");
  if (locEl) locEl.textContent = p.location;

  // PDF Resume link
  const resumeBtn = document.getElementById("resume-download-btn");
  if (resumeBtn) {
    resumeBtn.href = p.resumePdfUrl || "#";
    if (p.resumePdfUrl === "#") {
      resumeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showToast(">> [WARN]: Place resume.pdf in /assets/ & configure data.js");
      });
    }
  }

  // Teletype Code Box
  const codeSnippet = document.getElementById("code-snippet");
  if (codeSnippet) {
    codeSnippet.textContent = `// SYSTEM_STRUCT: OPERATOR_CONFIG
struct SystemOperator {
    char name[]      = "${p.name}";
    char location[]  = "${p.location}";
    char disciplines = ["AI_AGENTS", "ROBOTICS", "3D_CAD"];
    char education[] = "BYU-IDAHO // BUSINESS_ANALYTICS";
    char certs[]     = "SOLIDWORKS_CSWA // CERTIFIED";
    
    void executeMission() {
        optimizeStorageSystems();
        deployMultiAgentWorkflows();
        fabricatePrototypes();
    }
};
// BOOT RECORD VERIFIED: CHECKSUM 0x8086_OK`;
  }

  // Retro Stats Grid
  const statsContainer = document.getElementById("stats-grid");
  if (statsContainer && p.stats) {
    statsContainer.innerHTML = p.stats
      .map(
        (s) => `
      <div class="stat-item">
        <span class="stat-value">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `
      )
      .join("");
  }
}

// ===================================================================
// SKILLS & STRENGTHS RENDERING
// ===================================================================
function renderSkills() {
  const s = resumeData.skills;
  if (!s) return;

  // Render Core Pillars
  const strengthsContainer = document.getElementById("strengths-grid");
  if (strengthsContainer && s.coreStrengths) {
    strengthsContainer.innerHTML = s.coreStrengths
      .map(
        (str, idx) => `
      <div class="retro-strength-card">
        <h3 class="strength-title">0${idx + 1}. ${str.title.toUpperCase()}</h3>
        <p class="strength-desc">${str.desc}</p>
      </div>
    `
      )
      .join("");
  }

  // Render Categorized Skill Meters
  const catContainer = document.getElementById("skills-categories-grid");
  if (catContainer && s.categories) {
    catContainer.innerHTML = s.categories
      .map(
        (cat) => `
      <div class="retro-cat-card">
        <h3 class="retro-cat-title">&gt;&gt; ${cat.name.toUpperCase()}</h3>
        <div class="skill-list">
          ${cat.items
            .map(
              (item) => `
            <div class="retro-skill-item">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">[${item.level}%]</span>
              </div>
              <div class="retro-progress-track">
                <div class="skill-bar-fill" data-width="${item.level}%"></div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
      )
      .join("");
  }
}

// ===================================================================
// EXPERIENCE & LOGS RENDERING
// ===================================================================
function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container || !resumeData.experience) return;

  container.innerHTML = resumeData.experience
    .map(
      (job, idx) => `
    <div class="retro-log-card">
      <div class="retro-log-header">
        <span>LOG_RECORD_#0${idx + 1} // ${job.type.toUpperCase()}</span>
        <span>PERIOD: [${job.period}]</span>
      </div>
      <div class="retro-log-body">
        <h3 class="retro-log-role">${job.role.toUpperCase()}</h3>
        <div class="retro-log-comp">&gt; COMPANY: ${job.company.toUpperCase()} // LOC: ${job.location.toUpperCase()}</div>
        <p class="retro-log-desc">${job.description}</p>
        <ul class="retro-bullet-list">
          ${job.achievements.map((a) => `<li class="retro-bullet">${a}</li>`).join("")}
        </ul>
        <div class="retro-tags-bar">
          ${job.technologies.map((t) => `<span class="retro-tag">[${t}]</span>`).join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// ===================================================================
// PROJECTS RENDERING & FILTERING
// ===================================================================
function renderProjects(filter = "all") {
  const container = document.getElementById("projects-grid");
  if (!container || !resumeData.projects) return;

  const normalizedFilter = filter.toLowerCase().replace(/[^a-z0-9]/g, "");
  const filtered =
    normalizedFilter === "all"
      ? resumeData.projects
      : resumeData.projects.filter((p) => {
          const cat = (p.category || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          return cat.includes(normalizedFilter) || normalizedFilter.includes(cat);
        });

  container.innerHTML = filtered
    .map(
      (proj, idx) => `
    <div class="retro-proj-card">
      <div class="proj-headbar">
        <span>ARCHIVE_FILE_#0${idx + 1}</span>
        <span class="proj-badge">${proj.category.toUpperCase()}</span>
      </div>
      <div class="proj-content">
        <h3 class="proj-title">${proj.title.toUpperCase()}</h3>
        <div class="proj-tagline">&gt;&gt; ${proj.tagline}</div>
        <p class="proj-desc">${proj.description}</p>
        
        ${proj.metrics ? `<div class="proj-metric-box"><span>[TELEMETRY]</span> ${proj.metrics}</div>` : ""}

        <div class="retro-tags-bar" style="margin-bottom: 1rem;">
          ${proj.tech.map((t) => `<span class="retro-tag">${t}</span>`).join("")}
        </div>

        <div class="proj-links-bar">
          ${
            proj.githubUrl
              ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="proj-link">[ SOURCE_REPO ]</a>`
              : ""
          }
          ${
            proj.liveUrl
              ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="proj-link">[ LIVE_SIGNAL ]</a>`
              : ""
          }
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Setup Filter buttons
  const filterBtns = document.querySelectorAll(".retro-filter-btn");
  filterBtns.forEach((btn) => {
    btn.onclick = () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-filter");
      renderProjects(target);
    };
  });
}

// ===================================================================
// EDUCATION & CERTS RENDERING
// ===================================================================
function renderEducation() {
  const eduContainer = document.getElementById("education-content");
  if (eduContainer && resumeData.education) {
    eduContainer.innerHTML = resumeData.education
      .map(
        (edu) => `
      <div class="edu-box">
        <h3 class="edu-degree">${edu.degree.toUpperCase()}</h3>
        <div class="edu-school">${edu.institution.toUpperCase()}</div>
        <div class="edu-meta">&gt; REGISTRY: ${edu.period.toUpperCase()} // ${edu.location.toUpperCase()}</div>
        <ul class="retro-bullet-list">
          ${edu.highlights.map((h) => `<li class="retro-bullet">${h}</li>`).join("")}
        </ul>
      </div>
    `
      )
      .join("");
  }

  const certContainer = document.getElementById("certs-content");
  if (certContainer && resumeData.certifications) {
    certContainer.innerHTML = `
      <div class="edu-box">
        <h3 class="edu-degree" style="font-size: 1.6rem;">HARDWARE & AI ACCREDITATION</h3>
        <div>
          ${resumeData.certifications
            .map(
              (c) => `
            <div class="cert-entry">
              <div class="cert-name">&gt; ${c.name}</div>
              <div class="cert-issuer">ISSUER: ${c.issuer} // STATUS: ${c.year}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }
}

// ===================================================================
// CONTACT / COMMS RENDERING
// ===================================================================
function renderContact() {
  const p = resumeData.personal;
  if (!p) return;

  const emailBtn = document.getElementById("copy-email-btn");
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(p.email).then(() => {
        showToast(`>> COPIED: [${p.email}] TO BUFFER`);
      });
    });
  }

  const emailMailto = document.getElementById("mailto-link");
  if (emailMailto) {
    emailMailto.href = `mailto:${p.email}`;
    emailMailto.textContent = `[ TRANSMIT PACKET TO: ${p.email} ]`;
  }

  const githubLink = document.getElementById("contact-github");
  if (githubLink) githubLink.href = p.github;

  const linkedinLink = document.getElementById("contact-linkedin");
  if (linkedinLink) linkedinLink.href = p.linkedin;

  const copyright = document.getElementById("footer-year");
  if (copyright) copyright.textContent = new Date().getFullYear();
}

// ===================================================================
// VINTAGE CRT CONTROLS (PHOSPHOR CYCLER & SCANLINE TOGGLE)
// ===================================================================
function setupCrtControls() {
  const phosphorBtn = document.getElementById("toggle-phosphor");
  const modes = [
    { class: "crt-theme-amber", label: "AMBER" },
    { class: "crt-theme-green", label: "GREEN" },
    { class: "crt-theme-white", label: "WHITE" }
  ];
  let currentIdx = 0;

  if (phosphorBtn) {
    phosphorBtn.addEventListener("click", () => {
      document.body.classList.remove(modes[currentIdx].class);
      currentIdx = (currentIdx + 1) % modes.length;
      document.body.classList.add(modes[currentIdx].class);
      phosphorBtn.textContent = modes[currentIdx].label;
      showToast(`>> PHOSPHOR SET TO: ${modes[currentIdx].label}`);
    });
  }

  const scanlineBtn = document.getElementById("toggle-scanlines");
  const scanlinesLayer = document.getElementById("scanlines-layer");

  if (scanlineBtn && scanlinesLayer) {
    scanlineBtn.addEventListener("click", () => {
      scanlinesLayer.classList.toggle("hidden");
      const isOn = !scanlinesLayer.classList.contains("hidden");
      scanlineBtn.textContent = isOn ? "ON" : "OFF";
      scanlineBtn.classList.toggle("active", isOn);
      showToast(`>> CRT SCANLINES: ${isOn ? "ENABLED" : "DISABLED"}`);
    });
  }
}

// ===================================================================
// NAVIGATION & ANIMATIONS
// ===================================================================
function setupNavigation() {
  const navLinks = document.querySelectorAll(".retro-nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".skill-bar-fill");
          bars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  const skillsSection = document.getElementById("skills");
  if (skillsSection) observer.observe(skillsSection);
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "retro-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
