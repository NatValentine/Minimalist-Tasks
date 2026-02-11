import { getState, addTask } from "./state.js";

const $form = document.getElementById("task-form");
const $input = document.getElementById("task-form-input");
const $list = document.getElementById("task-list");

function render() {
  const { tasks } = getState();

  $list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
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
