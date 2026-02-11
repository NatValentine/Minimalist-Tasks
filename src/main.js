import { getState, addTask, toggleTask, deleteTask } from "./state.js";

const $form = document.getElementById("task-form");
const $input = document.getElementById("task-form-input");
const $list = document.getElementById("task-list");

function render() {
  const { tasks } = getState();

  $list.innerHTML = "";

  tasks.forEach((task) => {
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
