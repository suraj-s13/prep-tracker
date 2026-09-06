// ============================================================
// storage.js — LocalStorage helpers for progress persistence
// ============================================================

const STORAGE_KEYS = {
  COMPLETED:   "prep_completed",    // Set of completed question IDs
  TIMESTAMPS:  "prep_timestamps",   // Map of id → ISO timestamp
  STUDY_PLAN:  "prep_study_plan",   // Map of phase id → status
};

/** Return the Set of completed question IDs (as Numbers). */
function getCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

/** Persist the completed Set. */
function saveCompleted(set) {
  localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify([...set]));
}

/** Return the timestamp map { id: isoString }. */
function getTimestamps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TIMESTAMPS);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

/** Persist the timestamp map. */
function saveTimestamps(map) {
  localStorage.setItem(STORAGE_KEYS.TIMESTAMPS, JSON.stringify(map));
}

/** Return the study-plan status map { phaseId: status }. */
function getStudyPlanStatuses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

/** Persist a single study-plan status change. */
function saveStudyPlanStatus(id, status) {
  const map = getStudyPlanStatuses();
  map[id] = status;
  localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(map));
}

/**
 * Toggle a question's completion state.
 * Returns { completed: boolean, timestamp: string|null }.
 */
function toggleQuestion(id) {
  const done       = getCompleted();
  const timestamps = getTimestamps();

  if (done.has(id)) {
    done.delete(id);
    delete timestamps[id];
  } else {
    done.add(id);
    timestamps[id] = new Date().toISOString();
  }

  saveCompleted(done);
  saveTimestamps(timestamps);

  return {
    completed:  done.has(id),
    timestamp:  timestamps[id] || null,
  };
}

/**
 * Return the N most-recently completed questions with their timestamps.
 * Each item: { id, name, topic, timestamp }
 */
function getRecentActivity(n = 5) {
  const done       = getCompleted();
  const timestamps = getTimestamps();

  return QUESTIONS
    .filter(q => done.has(q.id))
    .map(q => ({ ...q, timestamp: timestamps[q.id] || "" }))
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, n);
}
