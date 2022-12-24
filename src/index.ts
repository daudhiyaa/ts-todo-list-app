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
  const item = document.createElement('li');

  const label = document.createElement('label');
  checkbox.addEventListener('change', (e) => {
    newTask.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = newTask.completed;

  label.append(checkbox, checkmark, newTask.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const JSONtask = localStorage.getItem('tasks');
  if (JSONtask == null) return [];
  return JSON.parse(JSONtask);
}
