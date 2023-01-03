import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  addListItem(newTask);
  input.value = '';

  tasks.push(newTask);
  saveTasks();
});

function addListItem(newTask: Task) {
  const checkbox = document.createElement('input');
  const checkmark = document.createElement('span');
  const taskTitle = document.createElement('p');
  const label = document.createElement('label');
  const deleteButton = document.createElement('button');
  const item = document.createElement('li');

  checkbox.addEventListener('change', (e) => {
    newTask.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = newTask?.completed;

  taskTitle.append(newTask?.title);
  label.append(checkbox, checkmark, taskTitle);
  deleteButton.classList.add('delBtn');
  deleteButton.append('Delete');

  let id = uuidV4();
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    deleteTask(newTask.id, id);
  });

  item.append(label, deleteButton);
  item.setAttribute('id', id);
  list?.append(item);
}

function deleteTask(IDTaskToDelete: string, id: string) {
  tasks.forEach((task, index) => {
    if (IDTaskToDelete == task.id) {
      tasks.splice(index, 1);
      // delete tasks[index];
      // console.log(id);
      const itemToDelete = document.getElementById(id);
      itemToDelete?.remove();
    }
  });
  saveTasks();
}

const btnDelete = document.getElementById('btnDeleteAll');
btnDelete?.addEventListener('click', (e) => {
  const items = loadTasks();
  e.preventDefault();
  items.splice(0, items.length);
  console.log(items.length);
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const JSONtask = localStorage.getItem('tasks');
  return JSONtask == null ? [] : JSON.parse(JSONtask);
}
