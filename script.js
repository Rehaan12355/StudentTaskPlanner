// script.js

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  document.getElementById('task-list').innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add(task.priority);
    li.innerHTML = `
      <span>${task.text} – Due: ${task.due}</span>
      <button class="complete-btn" data-index="${index}">✅</button>
    `;
    document.getElementById('task-list').appendChild(li);
  });
}

document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const taskInput = document.getElementById('task-input');
  const dueDate = document.getElementById('due-date');
  const priority = document.getElementById('priority');

  const newTask = {
    text: taskInput.value,
    due: dueDate.value,
    priority: priority.value
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = '';
  dueDate.value = '';
});

document.getElementById('task-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('complete-btn')) {
    const index = e.target.getAttribute('data-index');
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
});

// DARK MODE TOGGLE
const toggle = document.getElementById('dark-toggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

renderTasks();