import { loadState, saveState } from "./storage.js";

const state = loadState() || {
  tasks: [],
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

function signalChanges() {
  saveState(state);
  document.dispatchEvent(new Event("stateChange"));
}
