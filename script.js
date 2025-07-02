const overlay = document.getElementById('overlayMessage');
const taskList = document.getElementById('taskList');
const savedCard = document.getElementById('savedTasksCard');

window.onload = () => {
  overlay.style.display = 'block';
  setTimeout(() => overlay.style.display = 'none', 3000);
  loadTasks();
};

function hideMessage() {
  overlay.style.display = 'none';
}

function showMessage(text) {
  overlay.innerText = text;
  overlay.style.display = 'block';
  setTimeout(() => overlay.style.display = 'none', 2500);
}

function saveTask() {
  const text = document.getElementById('taskInput').value.trim();
  const date = document.getElementById('taskDate').value;
  const time = document.getElementById('taskTime').value;

  if (!text) return showMessage('Please enter a task.');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, date, time, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  document.getElementById('taskInput').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';

  showMessage('✅ Task Saved!');
  loadTasks();
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<p>No tasks saved yet.</p>';
    return;
  }

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task' + (task.completed ? ' completed' : '');
    div.innerHTML = \`
      <strong>\${task.text}</strong>
      <div class="meta"><span class="icon">📅</span> \${task.date} &nbsp;&nbsp; <span class="icon">⏰</span> \${task.time}</div>
      <div class="task-controls">
        <button onclick="toggleComplete(\${index})">\${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(\${index})">Delete</button>
      </div>
    \`;
    taskList.appendChild(div);
  });
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function toggleTasks() {
  savedCard.classList.toggle('hidden');
}
