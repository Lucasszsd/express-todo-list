const API_URL = 'http://localhost:3000/tasks';

document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    const filterTaskButton = document.getElementById('filter-task-button');
    addTaskButton.addEventListener('click', addTask);
    filterTaskButton.addEventListener('click', filterTasks);
    fetchTasks();
});

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <div>
            <span>Titulo : </span>
            ${task.title}
            <span>Descricao : </span>
            ${task.description}
            </div>
            <span>
            <button onclick="editTask('${task.id}')">Edit</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
            </span>
        `;
        taskList.appendChild(taskItem);
    });
}

async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });
        fetchTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(taskId) {
    try {
        await fetch(`${API_URL}/id/${taskId}`, {
            method: 'DELETE'
        });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function editTask(taskId) {
    const title = prompt('Enter new title:');
    const description = prompt('Enter new description:');
    if (title && description) {
        updateTask(taskId, title, description);
    }
}

async function updateTask(taskId, title, description) {
    try {
        await fetch(`${API_URL}/id/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });
        fetchTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function filterTasks() {
    const filter = document.getElementById('filter-title').value;
    try {
        const response = await fetch(`${API_URL}?title=${filter}`);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error filtering tasks:', error);
    }
}

