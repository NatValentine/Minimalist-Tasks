import { loadState, saveState } from "./storage.js";

export const FILTERS = {
  ALL: "all",
  PENDING: "pending",
  COMPLETED: "completed",
};

const state = loadState() || {
  tasks: [],
  filter: FILTERS.ALL,
};

export function getState() {
  return state;
}

export function addTask(text) {
  const newTask = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };

  state.tasks = [...state.tasks, newTask];

  signalChanges();
}

export function toggleTask(id) {
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return;

  task.completed = !task.completed;

  signalChanges();
}

export function deleteTask(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);

  signalChanges();
}

export function setFilter(filter) {
  state.filter = filter;
  signalChanges();
}

export function updateTasks(tasks) {
  state.tasks = tasks;
  signalChanges();
}

function signalChanges() {
  saveState(state);
  document.dispatchEvent(new Event("stateChange"));
}
