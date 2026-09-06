// ============================================================
// app.js — Shared initialisation & navigation logic
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTheme();

  // Page-specific init
  const page = document.body.dataset.page;
  if (page === "dashboard")  renderDashboard();
  if (page === "questions")  initQuestionsPage();
  if (page === "study-plan") initStudyPlan();
  if (page === "resources")  initResources();
});

// ── Navigation ────────────────────────────────────────────────

function initNav() {
  const hamburger = document.getElementById("hamburger");
  const sidebar   = document.getElementById("sidebar");
  hamburger?.addEventListener("click", () => sidebar?.classList.toggle("open"));

  // Close sidebar on outside click (mobile)
  document.addEventListener("click", e => {
    if (sidebar?.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        e.target !== hamburger) {
      sidebar.classList.remove("open");
    }
  });
}

// ── Dark / Light theme toggle ─────────────────────────────────

function initTheme() {
  const btn    = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("prep_theme") || "dark";
  applyTheme(stored);
  btn?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("prep_theme", next);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

// ── Study Plan page ───────────────────────────────────────────

function initStudyPlan() {
  const statuses = getStudyPlanStatuses();
  const phases   = [...new Set(STUDY_PLAN.map(p => p.phase))];
  const container = document.getElementById("study-plan-container");
  if (!container) return;

  container.innerHTML = phases.map((phase, phaseIdx) => {
    const items = STUDY_PLAN.filter(p => p.phase === phase);
    const rows  = items.map(item => {
      const status = statuses[item.id] || item.status;
      return buildStudyPlanCard(item, status);
    }).join("");
    const phaseColors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899"];
    const color = phaseColors[phaseIdx] || "#6366f1";
    return `
      <div class="phase-block">
        <div class="phase-header" style="border-left:4px solid ${color}">
          <span class="phase-label" style="color:${color}">${phase}</span>
        </div>
        <div class="phase-items">${rows}</div>
      </div>`;
  }).join("");

  attachStudyPlanListeners();
}

function buildStudyPlanCard(item, status) {
  const statusClass = { "Not Started": "status-ns", "In Progress": "status-ip", "Completed": "status-done" }[status] || "status-ns";
  return `
    <div class="study-card" id="sc-${item.id}">
      <div class="study-card-top">
        <div>
          <div class="study-period">${item.period}</div>
          <div class="study-topic">${item.topic}</div>
        </div>
        <select class="status-select ${statusClass}" data-id="${item.id}" aria-label="Status">
          ${["Not Started","In Progress","Completed"].map(s =>
            `<option value="${s}" ${s === status ? "selected" : ""}>${s}</option>`
          ).join("")}
        </select>
      </div>
      <div class="study-card-body">
        <div class="study-detail">
          <span class="detail-label">📋 Daily Tasks</span>
          <span>${item.tasks}</span>
        </div>
        <div class="study-detail">
          <span class="detail-label">📚 Resources</span>
          <span>${item.resources}</span>
        </div>
      </div>
    </div>`;
}

function attachStudyPlanListeners() {
  document.querySelectorAll(".status-select").forEach(sel => {
    sel.addEventListener("change", function () {
      saveStudyPlanStatus(this.dataset.id, this.value);
      this.className = `status-select ${{ "Not Started": "status-ns", "In Progress": "status-ip", "Completed": "status-done" }[this.value] || "status-ns"}`;
    });
  });
}

// ── Resources page ────────────────────────────────────────────

function initResources() {
  const categories  = [...new Set(RESOURCES.map(r => r.category))];
  const container   = document.getElementById("resources-container");
  if (!container) return;

  const catColors = {
    "DSA":            "#6366f1",
    "System Design":  "#10b981",
    "Mock Interviews":"#f59e0b",
    "YouTube":        "#ef4444",
    "Certifications": "#8b5cf6",
  };

  container.innerHTML = categories.map(cat => {
    const resources = RESOURCES.filter(r => r.category === cat);
    const color     = catColors[cat] || "#6366f1";
    const cards     = resources.map(r => buildResourceCard(r, color)).join("");
    return `
      <div class="resource-category">
        <h2 class="category-heading" style="color:${color}">
          <span class="category-dot" style="background:${color}"></span>${cat}
        </h2>
        <div class="resource-grid">${cards}</div>
      </div>`;
  }).join("");
}

function buildResourceCard(r, color) {
  const link = r.url
    ? `<a href="${r.url}" target="_blank" rel="noopener" class="resource-link" style="color:${color}">
         Visit →
       </a>`
    : `<span class="resource-no-link">📖 Book / Offline</span>`;

  return `
    <div class="resource-card">
      <div class="resource-card-top" style="border-top:3px solid ${color}">
        <span class="resource-name">${r.name}</span>
      </div>
      <p class="resource-desc">${r.description}</p>
      <div class="resource-card-footer">${link}</div>
    </div>`;
}
