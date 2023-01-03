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
  const taskTitle = document.createElement("p");
  const label = document.createElement("label");
  const deleteButton = document.createElement("button");
  const item = document.createElement("li");
  checkbox.addEventListener("change", (e) => {
    newTask.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = newTask?.completed;
  taskTitle.append(newTask?.title);
  label.append(checkbox, checkmark, taskTitle);
  deleteButton.classList.add("delBtn");
  deleteButton.append("Delete");
  let id = uuidV4();
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteTask(newTask.id, id);
  });
  item.append(label, deleteButton);
  item.setAttribute("id", id);
  list?.append(item);
}
function deleteTask(IDTaskToDelete, id) {
  tasks.forEach((task, index) => {
    if (IDTaskToDelete == task.id) {
      tasks.splice(index, 1);
      const itemToDelete = document.getElementById(id);
      itemToDelete?.remove();
    }
  });
  saveTasks();
}
const btnDelete = document.getElementById("btnDeleteAll");
btnDelete?.addEventListener("click", (e) => {
  const items = loadTasks();
  e.preventDefault();
  items.splice(0, items.length);
  console.log(items.length);
});
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const JSONtask = localStorage.getItem("tasks");
  return JSONtask == null ? [] : JSON.parse(JSONtask);
}
