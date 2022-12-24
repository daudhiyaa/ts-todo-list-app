import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-title");
const tasks = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null)
    return;
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  addListItem(newTask);
  input.value = "";
  tasks.push(newTask);
  saveTasks();
});
function addListItem(newTask) {
  const checkbox = document.createElement("input");
  const checkmark = document.createElement("span");
  const item = document.createElement("li");
  const label = document.createElement("label");
  checkbox.addEventListener("change", (e) => {
    newTask.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = newTask.completed;
  label.append(checkbox, checkmark, newTask.title);
  item.append(label);
  list?.append(item);
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const JSONtask = localStorage.getItem("tasks");
  if (JSONtask == null)
    return [];
  return JSON.parse(JSONtask);
}
