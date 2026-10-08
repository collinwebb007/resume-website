/**
 * Collin Webb • Vintage 80s x Chloe Style Scripts
 * Handles live Earth clock, TV channel switching, and dynamic project rendering.
 */

document.addEventListener("DOMContentLoaded", () => {
  setupEarthClock();
  setupTvChannels();
  setupCopyEmail();
  renderProjectsIfPresent();
  setupRandomChannelCard();
});

// ===================================================================
// LIVE EARTH TIME CLOCK (Chloe O'Hallaron Style)
// ===================================================================
function setupEarthClock() {
  const clockEl = document.getElementById("earth-clock");
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    clockEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ===================================================================
// 80s TV CHANNEL CONTROLS
// ===================================================================
function setupTvChannels() {
  const channelBtns = document.querySelectorAll(".ch-btn[data-src]");
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
      tvBadge.textContent = `${badgeText} • LIVE BROADCAST`;
    }
    showToast(`📺 Tuned to ${name}`);
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

  // Toggle Background Video
  const toggleBgBtn = document.getElementById("toggle-video-bg");
  const backdrop = document.getElementById("video-backdrop");
  if (toggleBgBtn && backdrop) {
    toggleBgBtn.addEventListener("click", () => {
      backdrop.classList.toggle("hidden-bg");
      const isHidden = backdrop.classList.contains("hidden-bg");
      toggleBgBtn.textContent = isHidden ? "BG VIDEO: OFF" : "BG VIDEO: ON";
      showToast(`Background video ${isHidden ? "hidden" : "enabled"}`);
    });
  }
}

// ===================================================================
// RANDOM CHANNEL EASTER EGG (Home Page Sticker)
// ===================================================================
function setupRandomChannelCard() {
  const easterCard = document.getElementById("random-channel-card");
  if (!easterCard) return;

  const channelBtns = Array.from(document.querySelectorAll(".ch-btn[data-src]"));
  if (channelBtns.length === 0) return;

  easterCard.addEventListener("click", () => {
    // Pick next channel
    const currentActive = document.querySelector(".ch-btn.active");
    const currentIdx = channelBtns.indexOf(currentActive);
    const nextIdx = (currentIdx + 1) % channelBtns.length;
    channelBtns[nextIdx].click();
  });
}

// ===================================================================
// EMAIL COPY BUTTONS
// ===================================================================
function setupCopyEmail() {
  const emailButtons = document.querySelectorAll("#copy-email-btn");
  const email = (typeof resumeData !== "undefined" && resumeData.personal?.email) || "collinwebb007@gmail.com";

  emailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(email).then(() => {
        showToast(`📋 Copied ${email} to clipboard!`);
      });
    });
  });
}

// ===================================================================
// PROJECTS ARCHIVE RENDERING & FILTERING (projects.html)
// ===================================================================
function renderProjectsIfPresent() {
  const container = document.getElementById("projects-grid");
  if (!container || typeof resumeData === "undefined" || !resumeData.projects) return;

  function render(filter = "all") {
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
      <article class="archive-proj-card" id="${proj.id}">
        <span class="proj-kicker">ARCHIVE FILE #0${idx + 1} • ${proj.category}</span>
        <h3 class="proj-name">${proj.title}</h3>
        <div class="proj-tag">${proj.tagline}</div>
        <p class="proj-description">${proj.description}</p>
        
        ${proj.metrics ? `<div class="proj-metrics-box">⚡ ${proj.metrics}</div>` : ""}

        <div class="tech-chips" style="margin-bottom: 1.2rem;">
          ${proj.tech.map((t) => `<span class="chip">${t}</span>`).join("")}
        </div>

        <div class="proj-links-footer">
          <div>
            ${
              proj.githubUrl
                ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="proj-link-action">Source Code ↗</a>`
                : ""
            }
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">CLASSIFIED</span>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Initial render
  render("all");

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".proj-filter-pill");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-filter");
      render(target);
    });
  });
}

// ===================================================================
// TOAST NOTIFICATION
// ===================================================================
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
