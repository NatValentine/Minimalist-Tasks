const STORAGE_KEY = "minimalistTasksState";

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);
  return saveState ? JSON.parse(savedState) : null;
}
