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
  checkbox.className = "peer absolute opacity-0 h-0 w-0";
  const checkmark = document.createElement("span");
  checkmark.className = 'group-hover:bg-white group-hover:border-solid group-hover:border-[#fff] group-hover:border-2 group-hover:hover:bg-indigo-700 relative flex items-center justify-center border-indigo-700 cursor-pointer border-2 border-solid p-[13px] rounded-[50%] after:absolute after:hidden after:w-2 after:h-4 after:mb-1 after:content-[""] after:border-solid after:border-white after:border-t-0 after:border-r-[3px] after:border-b-[3px] after:border-l-0 after:rotate-45 peer-checked:bg-indigo-700 peer-checked:shadow-[0_0_5px_rgba(0,0,0,0.5)] peer-checked:after:block';
  const taskTitle = document.createElement("p");
  taskTitle.className = "text-gray-600 text-justify peer-checked:line-through group-hover:text-white";
  const label = document.createElement("label");
  label.className = "flex flex-row items-center text-sm gap-[10px]";
  const deleteButton = document.createElement("button");
  deleteButton.className = "bg-gray-100 cursor-pointer text-sm rounded-[10px] border-none py-[5px] px-[10px] group-hover:text-indigo-700 group-hover:bg-white";
  const li = document.createElement("li");
  li.className = "gap-[15px] bg-white flex items-center justify-between shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[15px] py-[8px] px-[10px] group hover:bg-indigo-700 hover:shadow-[0_0_5px_rgba(0,0,0,0.5)]";
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
  li.append(label, deleteButton);
  li.setAttribute("id", id);
  list?.append(li);
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
