// ============================================================
// questions.js — Questions page logic
// ============================================================

let currentFilter = { topic: "All", difficulty: "All", status: "All", search: "" };

/** Main entry-point for questions.html */
function initQuestionsPage() {
  buildFilterUI();
  renderQuestions();
}

/** Build the filter bar dropdowns dynamically from data. */
function buildFilterUI() {
  const topics = ["All", ...new Set(QUESTIONS.map(q => q.topic))];
  fillSelect("filter-topic",      topics);
  fillSelect("filter-difficulty", ["All", "Easy", "Medium", "Hard"]);
  fillSelect("filter-status",     ["All", "Completed", "Not Started"]);

  document.getElementById("filter-topic")?.addEventListener("change",     e => { currentFilter.topic      = e.target.value; renderQuestions(); });
  document.getElementById("filter-difficulty")?.addEventListener("change", e => { currentFilter.difficulty = e.target.value; renderQuestions(); });
  document.getElementById("filter-status")?.addEventListener("change",    e => { currentFilter.status     = e.target.value; renderQuestions(); });
  document.getElementById("search-box")?.addEventListener("input",        e => { currentFilter.search     = e.target.value.toLowerCase(); renderQuestions(); });
  document.getElementById("btn-expand-all")?.addEventListener("click",    () => toggleAllGroups(true));
  document.getElementById("btn-collapse-all")?.addEventListener("click",  () => toggleAllGroups(false));
}

function fillSelect(id, options) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = options.map(o => `<option value="${o}">${o}</option>`).join("");
}

/** Filter the question list according to currentFilter. */
function getFilteredQuestions() {
  const done = getCompleted();
  return QUESTIONS.filter(q => {
    if (currentFilter.topic      !== "All" && q.topic      !== currentFilter.topic)      return false;
    if (currentFilter.difficulty !== "All" && q.difficulty !== currentFilter.difficulty) return false;
    if (currentFilter.status     !== "All") {
      const isDone = done.has(q.id);
      if (currentFilter.status === "Completed"   && !isDone) return false;
      if (currentFilter.status === "Not Started" &&  isDone) return false;
    }
    if (currentFilter.search) {
      const haystack = `${q.name} ${q.topic} ${q.lc}`.toLowerCase();
      if (!haystack.includes(currentFilter.search)) return false;
    }
    return true;
  });
}

/** Render grouped questions by topic. */
function renderQuestions() {
  const container = document.getElementById("questions-container");
  if (!container) return;

  const done      = getCompleted();
  const filtered  = getFilteredQuestions();

  if (!filtered.length) {
    container.innerHTML = `<div class="empty-state">No questions match your filters.</div>`;
    updateQuestionCount(0, QUESTIONS.length);
    return;
  }

  // Group by topic
  const grouped = {};
  filtered.forEach(q => {
    if (!grouped[q.topic]) grouped[q.topic] = [];
    grouped[q.topic].push(q);
  });

  // Render groups
  container.innerHTML = Object.entries(grouped).map(([topic, qs]) => {
    const color       = TOPIC_COLORS[topic] || "#6366f1";
    const allForTopic = QUESTIONS.filter(q => q.topic === topic);
    const doneCount   = allForTopic.filter(q => done.has(q.id)).length;
    const rows        = qs.map(q => buildQuestionRow(q, done)).join("");

    return `
      <div class="topic-group" id="group-${slugify(topic)}">
        <div class="topic-group-header" style="border-left:4px solid ${color}"
             onclick="toggleGroup('group-${slugify(topic)}')">
          <div class="topic-group-title">
            <span class="topic-icon" style="background:${color}20;color:${color}">
              ${topicIcon(topic)}
            </span>
            <span style="color:${color}">${topic}</span>
            <span class="topic-group-badge" style="background:${color}20;color:${color}">
              ${doneCount} / ${allForTopic.length} done
            </span>
          </div>
          <span class="toggle-icon">▾</span>
        </div>
        <div class="topic-group-body">
          <div class="question-table-header">
            <span>#</span><span>Question</span><span>LC</span>
            <span>Difficulty</span><span>Pattern</span><span>Status</span>
          </div>
          ${rows}
        </div>
      </div>`;
  }).join("");

  updateQuestionCount(filtered.length, QUESTIONS.length);
  attachCheckboxListeners();
}

/** Build a single question row. */
function buildQuestionRow(q, done) {
  const isCompleted = done.has(q.id);
  const diffColor   = DIFFICULTY_COLORS[q.difficulty] || "#888";
  const lcUrl       = `https://leetcode.com/problems/${q.name.toLowerCase().replace(/\s+/g, "-")}/`;

  return `
    <div class="question-row ${isCompleted ? "completed" : ""}" id="row-${q.id}">
      <span class="q-num">${q.id}</span>
      <span class="q-name">
        <a href="${lcUrl}" target="_blank" rel="noopener" class="q-link">${q.name}</a>
      </span>
      <span class="q-lc">
        <a href="https://leetcode.com/problems/${q.lc.replace("#","")}" target="_blank"
           rel="noopener" class="lc-badge">${q.lc}</a>
      </span>
      <span class="q-diff" style="color:${diffColor}">${q.difficulty}</span>
      <span class="q-pattern">${q.pattern}</span>
      <span class="q-status">
        <label class="checkbox-wrapper" title="${isCompleted ? "Mark incomplete" : "Mark complete"}">
          <input type="checkbox" class="q-checkbox" data-id="${q.id}" ${isCompleted ? "checked" : ""}/>
          <span class="custom-check ${isCompleted ? "checked" : ""}"></span>
        </label>
      </span>
    </div>`;
}

/** Wire up checkbox click handlers. */
function attachCheckboxListeners() {
  document.querySelectorAll(".q-checkbox").forEach(cb => {
    cb.addEventListener("change", function () {
      const id  = parseInt(this.dataset.id);
      const res = toggleQuestion(id);
      updateRowUI(id, res.completed);
      updateTopicGroupCount(id);
      // Sync dashboard if it's open in the same tab
      if (typeof renderDashboard === "function") renderDashboard();
    });
  });
}

/** Update a single row's visual state after toggle. */
function updateRowUI(id, completed) {
  const row   = document.getElementById(`row-${id}`);
  const check = row?.querySelector(".custom-check");
  if (!row) return;
  row.classList.toggle("completed", completed);
  if (check) check.classList.toggle("checked", completed);
}

/** Refresh the topic group badge count. */
function updateTopicGroupCount(questionId) {
  const q         = QUESTIONS.find(x => x.id === questionId);
  if (!q) return;
  const done      = getCompleted();
  const groupEl   = document.getElementById(`group-${slugify(q.topic)}`);
  const badge     = groupEl?.querySelector(".topic-group-badge");
  if (!badge) return;
  const total     = QUESTIONS.filter(x => x.topic === q.topic).length;
  const doneCount = QUESTIONS.filter(x => x.topic === q.topic && done.has(x.id)).length;
  badge.textContent = `${doneCount} / ${total} done`;
}

function updateQuestionCount(shown, total) {
  const el = document.getElementById("question-count");
  if (el) el.textContent = `Showing ${shown} of ${total} questions`;
}

function toggleGroup(id) {
  const group = document.getElementById(id);
  if (!group) return;
  group.classList.toggle("collapsed");
  const icon = group.querySelector(".toggle-icon");
  if (icon) icon.textContent = group.classList.contains("collapsed") ? "▸" : "▾";
}

function toggleAllGroups(expand) {
  document.querySelectorAll(".topic-group").forEach(g => {
    g.classList.toggle("collapsed", !expand);
    const icon = g.querySelector(".toggle-icon");
    if (icon) icon.textContent = expand ? "▾" : "▸";
  });
}

// ── Tiny helpers ─────────────────────────────────────────────

function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

function topicIcon(topic) {
  const map = {
    "Arrays":         "[ ]",
    "Strings":        '"S"',
    "Binary Search":  "⌕",
    "Trees":          "🌲",
    "Graphs":         "⬡",
    "Dynamic Prog.":  "DP",
    "Linked List":    "↔",
    "Heap/Queue":     "⊕",
  };
  return map[topic] || "◆";
}
