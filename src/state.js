let state = {
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

  document.dispatchEvent(new Event("stateChange"));
}
