/**
 * Main Application Logic
 * Renders data dynamically, handles UI interactions, animations, and filtering.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderSkills();
  renderExperience();
  renderProjects("all");
  renderEducation();
  renderContact();
  setupNavigation();
  setupThemeToggle();
  setupScrollAnimations();
});

// ===================================================================
// HERO RENDERING
// ===================================================================
function renderHero() {
  const p = resumeData.personal;
  if (!p) return;

  // Title and subtitle
  const titleEl = document.getElementById("hero-title");
  if (titleEl) {
    titleEl.innerHTML = `Hi, I'm <span class="gradient-text">${p.name}</span>`;
  }

  const roleEl = document.getElementById("hero-role");
  if (roleEl) roleEl.textContent = p.role;

  const taglineEl = document.getElementById("hero-tagline");
  if (taglineEl) taglineEl.textContent = p.tagline;

  const locEl = document.getElementById("hero-location");
  if (locEl) locEl.textContent = p.location;

  const availEl = document.getElementById("hero-availability");
  if (availEl) availEl.textContent = p.availability;

  // PDF Resume link
  const resumeBtn = document.getElementById("resume-download-btn");
  if (resumeBtn) {
    resumeBtn.href = p.resumePdfUrl || "#";
    if (p.resumePdfUrl === "#") {
      resumeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("📄 Add your resume PDF to the assets/ folder and link it in js/data.js!");
      });
    }
  }

  // Interactive Code Card in Hero
  const codeSnippet = document.getElementById("code-snippet");
  if (codeSnippet) {
    codeSnippet.innerHTML = `
<span class="keyword">const</span> <span class="property">engineer</span> = {
  <span class="property">name</span>: <span class="string">"${p.name}"</span>,
  <span class="property">role</span>: <span class="string">"${p.role}"</span>,
  <span class="property">specialties</span>: [<span class="string">"AI Agents"</span>, <span class="string">"Robotics"</span>, <span class="string">"3D CAD"</span>],
  <span class="property">location</span>: <span class="string">"${p.location}"</span>,
  <span class="function">createValue</span>() {
    <span class="keyword">return</span> <span class="string">"Autonomous Systems • 0-to-1 Prototyping"</span>;
  }
};`;
  }

  // Stats Grid
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
// SKILLS RENDERING
// ===================================================================
function renderSkills() {
  const s = resumeData.skills;
  if (!s) return;

  // Render Core Strengths
  const strengthsContainer = document.getElementById("strengths-grid");
  if (strengthsContainer && s.coreStrengths) {
    strengthsContainer.innerHTML = s.coreStrengths
      .map(
        (str) => `
      <div class="strength-card">
        <div class="strength-icon">⚡</div>
        <h3 class="strength-title">${str.title}</h3>
        <p class="strength-desc">${str.desc}</p>
      </div>
    `
      )
      .join("");
  }

  // Render Category Cards & Meters
  const catContainer = document.getElementById("skills-categories-grid");
  if (catContainer && s.categories) {
    catContainer.innerHTML = s.categories
      .map(
        (cat) => `
      <div class="skill-cat-card">
        <div class="skill-cat-title">
          <span>${cat.name}</span>
        </div>
        <div class="skill-list">
          ${cat.items
            .map(
              (item) => `
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-bar-bg">
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
// EXPERIENCE RENDERING
// ===================================================================
function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container || !resumeData.experience) return;

  container.innerHTML = resumeData.experience
    .map(
      (job) => `
    <div class="timeline-item">
      <div class="timeline-node"></div>
      <div class="exp-card">
        <div class="exp-header">
          <div>
            <h3 class="exp-role">${job.role}</h3>
            <div class="exp-company">${job.company} • <span style="color:var(--text-muted);font-weight:400;">${job.location}</span></div>
          </div>
          <div class="exp-badge">${job.period}</div>
        </div>
        <p class="exp-desc">${job.description}</p>
        <ul class="exp-bullets">
          ${job.achievements.map((a) => `<li class="exp-bullet">${a}</li>`).join("")}
        </ul>
        <div class="tech-tags">
          ${job.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
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
      (proj) => `
    <div class="project-card">
      <div class="project-banner" style="background: ${proj.gradient || "var(--grad-primary)"}">
        <span class="project-category-badge">${proj.category}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-tagline">${proj.tagline}</p>
        <p class="project-desc">${proj.description}</p>
        
        ${proj.metrics ? `<div class="project-metrics"><span>⚡</span> ${proj.metrics}</div>` : ""}

        <div class="tech-tags" style="margin-top: 0.5rem;">
          ${proj.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
        </div>

        <div class="project-footer">
          <div class="project-links">
            ${
              proj.githubUrl
                ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" title="Source Code">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>`
                : ""
            }
            ${
              proj.liveUrl
                ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" title="Live Preview">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>`
                : ""
            }
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">Featured</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Setup Filter button click listeners
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-filter");
      renderProjects(target);
    });
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
      <div class="edu-card">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">
          ${edu.degree}
        </h3>
        <div style="color: #818cf8; font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem;">
          ${edu.institution}
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
          ${edu.period} • ${edu.location}
        </div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem;">
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
      <div class="cert-card">
        <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.2rem;">Verified Credentials</h3>
        <div class="cert-list">
          ${resumeData.certifications
            .map(
              (c) => `
            <div class="cert-item">
              <div>
                <div style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">${c.name}</div>
                <div style="font-size: 0.82rem; color: var(--text-secondary);">${c.issuer} • ${c.year}</div>
              </div>
              <span style="font-size: 1.1rem; color: #34d399;">✓</span>
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

  const emailBtn = document.getElementById("copy-email-btn");
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(p.email).then(() => {
        showToast(`Copied ${p.email} to clipboard!`);
      });
    });
  }

  const emailMailto = document.getElementById("mailto-link");
  if (emailMailto) {
    emailMailto.href = `mailto:${p.email}`;
  }

  const githubLink = document.getElementById("contact-github");
  if (githubLink) githubLink.href = p.github;

  const linkedinLink = document.getElementById("contact-linkedin");
  if (linkedinLink) linkedinLink.href = p.linkedin;

  const copyright = document.getElementById("footer-year");
  if (copyright) copyright.textContent = new Date().getFullYear();
}

// ===================================================================
// NAVIGATION & THEME HELPERS
// ===================================================================
function setupNavigation() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navGlass = document.querySelector(".nav-glass");

  if (mobileToggle && navGlass) {
    mobileToggle.addEventListener("click", () => {
      navGlass.classList.toggle("mobile-menu-active");
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

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

function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    btn.innerHTML = isLight ? "🌙" : "☀️";
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersectTarget || entry.isIntersecting) {
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
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
