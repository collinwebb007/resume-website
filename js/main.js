/**
 * Vintage 1980s Broadcast & Resume Application Logic
 * Renders data cleanly, handles 80s TV channel switching, and interactive widgets.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderSkills();
  renderExperience();
  renderProjects("all");
  renderEducation();
  renderContact();
  setupTvChannels();
  setupNavigation();
  setupScrollAnimations();
});

// ===================================================================
// HERO RENDERING
// ===================================================================
function renderHero() {
  const p = resumeData.personal;
  if (!p) return;

  // PDF Resume link
  const resumeBtn = document.getElementById("resume-download-btn");
  if (resumeBtn) {
    resumeBtn.href = p.resumePdfUrl || "#";
    if (p.resumePdfUrl === "#") {
      resumeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("📄 Add resume.pdf to assets/ and update js/data.js");
      });
    }
  }

  // Copy Email Button in Hero
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(p.email).then(() => {
        showToast(`Copied ${p.email} to clipboard!`);
      });
    });
  }
}

// ===================================================================
// SKILLS & STRENGTHS RENDERING
// ===================================================================
function renderSkills() {
  const s = resumeData.skills;
  if (!s) return;

  // Render 4 Pillars
  const strengthsContainer = document.getElementById("strengths-grid");
  if (strengthsContainer && s.coreStrengths) {
    strengthsContainer.innerHTML = s.coreStrengths
      .map(
        (str, idx) => `
      <div class="pillar-card">
        <div class="pillar-num">PILLAR 0${idx + 1}</div>
        <h3 class="pillar-title">${str.title}</h3>
        <p class="pillar-desc">${str.desc}</p>
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
      <div class="skill-cat-card">
        <h3 class="skill-cat-title">${cat.name}</h3>
        <div class="skill-list">
          ${cat.items
            .map(
              (item) => `
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-track">
                <div class="skill-fill" data-width="${item.level}%"></div>
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
// EXPERIENCE RENDERING
// ===================================================================
function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container || !resumeData.experience) return;

  container.innerHTML = resumeData.experience
    .map(
      (job) => `
    <div class="exp-card">
      <div class="exp-header">
        <h3 class="exp-role">${job.role}</h3>
        <span class="exp-period-badge">${job.period}</span>
      </div>
      <div class="exp-company">${job.company} • ${job.location}</div>
      <p class="exp-desc">${job.description}</p>
      <ul class="exp-bullets">
        ${job.achievements.map((a) => `<li class="exp-bullet">${a}</li>`).join("")}
      </ul>
      <div class="exp-tags">
        ${job.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
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
      (proj) => `
    <div class="proj-card">
      <span class="proj-cat-badge">${proj.category}</span>
      <h3 class="proj-title">${proj.title}</h3>
      <div class="proj-tagline">${proj.tagline}</div>
      <p class="proj-desc">${proj.description}</p>
      
      ${proj.metrics ? `<div class="proj-metrics">⚡ ${proj.metrics}</div>` : ""}

      <div class="exp-tags" style="margin-bottom: 1rem;">
        ${proj.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>

      <div class="proj-footer">
        <div>
          ${
            proj.githubUrl
              ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="proj-link-text">View Source Code →</a>`
              : ""
          }
        </div>
        <div>
          ${
            proj.liveUrl
              ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="proj-link-text">Live Demo ↗</a>`
              : ""
          }
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Setup Filter button click listeners
  const filterBtns = document.querySelectorAll(".filter-pill");
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
        <h3 class="edu-degree">${edu.degree}</h3>
        <div class="edu-school">${edu.institution}</div>
        <div class="edu-meta">${edu.period} • ${edu.location}</div>
        <ul class="exp-bullets">
          ${edu.highlights.map((h) => `<li class="exp-bullet">${h}</li>`).join("")}
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
        <h3 class="edu-degree" style="font-size: 1.35rem; margin-bottom: 1.2rem;">Verified Accreditations</h3>
        <div>
          ${resumeData.certifications
            .map(
              (c) => `
            <div class="cert-card-item">
              <div class="cert-name">${c.name}</div>
              <div class="cert-issuer">${c.issuer} • ${c.year}</div>
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
// CONTACT SECTION RENDERING
// ===================================================================
function renderContact() {
  const p = resumeData.personal;
  if (!p) return;

  const copyFooterBtn = document.getElementById("copy-email-btn-footer");
  if (copyFooterBtn) {
    copyFooterBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(p.email).then(() => {
        showToast(`Copied ${p.email} to clipboard!`);
      });
    });
  }

  const emailMailto = document.getElementById("mailto-link");
  if (emailMailto) {
    emailMailto.href = `mailto:${p.email}`;
    emailMailto.textContent = `Send an Email (${p.email})`;
  }

  const githubLink = document.getElementById("contact-github");
  if (githubLink) githubLink.href = p.github;

  const linkedinLink = document.getElementById("contact-linkedin");
  if (linkedinLink) linkedinLink.href = p.linkedin;

  const copyright = document.getElementById("footer-year");
  if (copyright) copyright.textContent = new Date().getFullYear();
}

// ===================================================================
// 80s TV CHANNEL SELECTOR & CONTROLS (NATIVE HTML5 VIDEOS)
// ===================================================================
function setupTvChannels() {
  const channelBtns = document.querySelectorAll(".channel-btn[data-src]");
  const bgVideo = document.getElementById("bg-video-player");
  const tvVideo = document.getElementById("tv-video-player");
  const channelLabel = document.getElementById("current-channel-name");
  const tvBadge = document.getElementById("screen-ch-badge");

  function switchVideo(src, name, badgeText) {
    if (bgVideo) {
      bgVideo.src = src;
      bgVideo.load();
      bgVideo.play().catch(() => {});
    }
    if (tvVideo) {
      tvVideo.src = src;
      tvVideo.load();
      tvVideo.play().catch(() => {});
    }
    if (channelLabel) {
      channelLabel.textContent = name;
    }
    if (tvBadge) {
      tvBadge.textContent = `${badgeText} • LIVE`;
    }
    showToast(`📺 Switched to ${name}`);
  }

  channelBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      channelBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const src = btn.getAttribute("data-src");
      const name = btn.getAttribute("data-name");
      const badgeText = btn.textContent.trim().split("•")[0].trim();

      switchVideo(src, name, badgeText);
    });
  });

  // Toggle Background Video Button
  const toggleBgBtn = document.getElementById("toggle-video-bg");
  const backdrop = document.getElementById("video-backdrop");
  if (toggleBgBtn && backdrop) {
    toggleBgBtn.addEventListener("click", () => {
      backdrop.classList.toggle("hidden-bg");
      const isHidden = backdrop.classList.contains("hidden-bg");
      toggleBgBtn.textContent = isHidden ? "OFF" : "ON";
      showToast(`Background video ${isHidden ? "hidden" : "enabled"}`);
    });
  }
}

// ===================================================================
// NAVIGATION & ANIMATIONS
// ===================================================================
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
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
          const bars = entry.target.querySelectorAll(".skill-fill");
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
    toast.className = "vintage-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
