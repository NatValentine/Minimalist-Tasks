import {
  getState,
  addTask,
  toggleTask,
  deleteTask,
  FILTERS,
  setFilter,
} from "./state.js";

const $form = document.getElementById("task-form");
const $input = document.getElementById("task-form-input");
const $list = document.getElementById("task-list");
const $filters = document.getElementById("filters");

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
  const { tasks, filter } = getState();

  document.querySelectorAll("#filters button").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === filter);
  });

  $list.innerHTML = "";

  let filteredTasks = tasks;

  switch (filter) {
    case FILTERS.COMPLETED:
      filteredTasks = tasks.filter((t) => t.completed);
      break;

    case FILTERS.PENDING:
      filteredTasks = tasks.filter((t) => !t.completed);
      break;
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    // toggle on click
    li.addEventListener("click", () => {
      toggleTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
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

document.addEventListener("stateChange", render);

render();
