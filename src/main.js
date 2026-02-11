import {
  getState,
  addTask,
  toggleTask,
  deleteTask,
  FILTERS,
  setFilter,
  updateTasks,
} from "./state.js";

const $form = document.getElementById("task-form");
const $input = document.getElementById("task-form-input");
const $list = document.getElementById("task-list");
const $filters = document.getElementById("filters");
const $counter = document.getElementById("counter");
const $clearBtn = document.getElementById("clear-btn");

Object.values(FILTERS).forEach((f) => {
  const btn = document.createElement("button");

  btn.textContent = f;
  btn.dataset.filters = f;

  btn.addEventListener("click", () => {
    setFilter(f);
  });

  $filters.appendChild(btn);
});

function render() {
  $list.innerHTML = "";

  setPendingCount();

  $clearBtn.classList.toggle("visible", getCompletedCount() > 0);

  const tasks = getFilteredTasks();

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(span);

    if (task.completed) {
      li.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggle
      deleteTask(task.id);
    });

    li.appendChild(deleteBtn);
    $list.appendChild(li);
  });
}

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = $input.value.trim();
  if (!text) return;

  addTask(text);
  $input.value = "";
});

function getFilteredTasks() {
  const { tasks, filter } = getState();

  document.querySelectorAll("#filters button").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === filter);
  });

  let filteredTasks = tasks;

  switch (filter) {
    case FILTERS.COMPLETED:
      filteredTasks = tasks.filter((t) => t.completed);
      break;

    case FILTERS.PENDING:
      filteredTasks = tasks.filter((t) => !t.completed);
      break;
  }

  return filteredTasks;
}

function setPendingCount() {
  const { tasks } = getState();
  const count = tasks.filter((t) => !t.completed).length;

  if (count === 0) $counter.textContent = "No pending tasks!";
  if (count === 1) $counter.textContent = "1 task pending.";
  if (count > 1) $counter.textContent = `${count} tasks pending.`;
}

function getCompletedCount() {
  const { tasks } = getState();
  return tasks.filter((t) => t.completed).length;
}

function clearCompleted() {
  const { tasks } = getState();
  updateTasks(tasks.filter((t) => !t.completed));
}

function init() {
  document.addEventListener("stateChange", render);
  $clearBtn.addEventListener("click", clearCompleted);

  render();

  document.getElementById("app").style.opacity = "1";
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
