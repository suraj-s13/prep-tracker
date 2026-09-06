// ============================================================
// dashboard.js — Dashboard page logic
// ============================================================

/** Compute overall + per-topic stats from current LocalStorage state. */
function calculateStats() {
  const done = getCompleted();

  const total     = QUESTIONS.length;
  const completed = done.size;
  const remaining = total - completed;
  const pct       = total ? Math.round((completed / total) * 100) : 0;

  // Per-topic breakdown
  const topics = {};
  QUESTIONS.forEach(q => {
    if (!topics[q.topic]) topics[q.topic] = { total: 0, completed: 0 };
    topics[q.topic].total++;
    if (done.has(q.id)) topics[q.topic].completed++;
  });

  return { total, completed, remaining, pct, topics };
}

/** Render the full dashboard. Called on page load and after every toggle. */
function renderDashboard() {
  const { total, completed, remaining, pct, topics } = calculateStats();

  // ── Stat cards ──────────────────────────────────────────
  setEl("stat-total",     total);
  setEl("stat-completed", completed);
  setEl("stat-remaining", remaining);
  setEl("stat-pct",       pct + "%");

  // ── Overall progress bar ─────────────────────────────────
  const bar = document.getElementById("overall-bar");
  if (bar) {
    bar.style.width = pct + "%";
    bar.textContent = pct + "%";
    bar.setAttribute("aria-valuenow", pct);
  }

  // ── Topic-wise progress bars ─────────────────────────────
  const topicContainer = document.getElementById("topic-progress");
  if (topicContainer) {
    topicContainer.innerHTML = Object.entries(topics).map(([topic, data]) => {
      const topicPct = data.total ? Math.round((data.completed / data.total) * 100) : 0;
      const color    = TOPIC_COLORS[topic] || "#6366f1";
      return `
        <div class="topic-progress-item">
          <div class="topic-header">
            <span class="topic-label" style="color:${color}">${topic}</span>
            <span class="topic-count">${data.completed} / ${data.total}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${topicPct}%;background:${color}" data-pct="${topicPct}"></div>
          </div>
          <div class="topic-pct">${topicPct}%</div>
        </div>`;
    }).join("");
  }

  // ── Topic chart (SVG bar chart) ──────────────────────────
  renderTopicChart(topics);

  // ── Recent activity ──────────────────────────────────────
  renderRecentActivity();
}

/** Simple SVG bar chart — no external libraries. */
function renderTopicChart(topics) {
  const container = document.getElementById("topic-chart");
  if (!container) return;

  const entries  = Object.entries(topics);
  const barW     = 48;
  const gap      = 20;
  const svgH     = 200;
  const labelH   = 50;
  const maxVal   = Math.max(...entries.map(([, d]) => d.total), 1);
  const svgW     = entries.length * (barW + gap) + gap;

  const bars = entries.map(([topic, data], i) => {
    const color       = TOPIC_COLORS[topic] || "#6366f1";
    const x           = gap + i * (barW + gap);
    const totalH      = Math.round((data.total     / maxVal) * (svgH - 30));
    const completedH  = Math.round((data.completed / maxVal) * (svgH - 30));
    const totalY      = svgH - totalH;
    const completedY  = svgH - completedH;
    const shortLabel  = topic.length > 7 ? topic.slice(0, 6) + "…" : topic;

    return `
      <g class="chart-bar-group" data-topic="${topic}">
        <rect x="${x}" y="${totalY}" width="${barW}" height="${totalH}"
              rx="4" fill="${color}" opacity="0.25"/>
        <rect x="${x}" y="${completedY}" width="${barW}" height="${completedH}"
              rx="4" fill="${color}"/>
        <text x="${x + barW / 2}" y="${svgH + 16}" text-anchor="middle"
              class="chart-label">${shortLabel}</text>
        <text x="${x + barW / 2}" y="${completedY - 5}" text-anchor="middle"
              class="chart-value">${data.completed}/${data.total}</text>
      </g>`;
  }).join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${svgW} ${svgH + labelH}" xmlns="http://www.w3.org/2000/svg"
         class="topic-svg" aria-label="Topic progress chart">
      ${bars}
    </svg>
    <div class="chart-legend">
      <span class="legend-item"><span class="legend-dot" style="opacity:.3;background:#6366f1"></span>Total</span>
      <span class="legend-item"><span class="legend-dot" style="background:#6366f1"></span>Completed</span>
    </div>`;
}

/** Render the recent-activity list. */
function renderRecentActivity() {
  const container = document.getElementById("recent-activity");
  if (!container) return;

  const recent = getRecentActivity(6);

  if (!recent.length) {
    container.innerHTML = `<p class="empty-state">No questions completed yet. Start solving! 🚀</p>`;
    return;
  }

  container.innerHTML = recent.map(q => {
    const color = TOPIC_COLORS[q.topic] || "#6366f1";
    const when  = q.timestamp ? timeAgo(new Date(q.timestamp)) : "";
    return `
      <div class="activity-item">
        <span class="activity-check" style="color:${color}">✓</span>
        <div class="activity-info">
          <span class="activity-name">${q.name}</span>
          <span class="activity-meta" style="color:${color}">${q.topic}</span>
        </div>
        <span class="activity-time">${when}</span>
      </div>`;
  }).join("");
}

// ── Helpers ──────────────────────────────────────────────────

function setEl(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60)    return "just now";
  if (diff < 3600)  return Math.floor(diff / 60)   + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600)  + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}

// Expose so questions.js can call it from any page
window.refreshDashboard = renderDashboard;
