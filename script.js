// DOM Elements
const titleInput = document.getElementById('todo-title');
const descriptionInput = document.getElementById('todo-desc');
const actionButton = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
let todos = [];
let editingId = null;
const STORAGE_KEY = 'todoList';
// Load todos from localStorage
function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        todos = JSON.parse(saved);
    }
}
// Save todos to localStorage
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
// Render todo items to UI
function renderTodos() {
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        const todoTitle = document.createElement('span');
        todoTitle.textContent = todo.title;
        todoTitle.className = 'todo-title' + (todo.done ? ' done' : '');
        const actions = document.createElement('div');
        actions.className = 'actions';
        // Create action icons
        const checkIcon = document.createElement('i');
        checkIcon.className = 'fa-solid fa-check check';
        actions.appendChild(checkIcon);
        const editIcon = document.createElement('i');
        editIcon.className = 'fa-solid fa-pen-to-square edit';
        actions.appendChild(editIcon);
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash delete';
        actions.appendChild(deleteIcon);
        // Add event listeners
        checkIcon.addEventListener('click', () => {
            todo.done = !todo.done;
            saveTodos();
            renderTodos();
        });
        editIcon.addEventListener('click', () => {
            titleInput.value = todo.title;
            descriptionInput.value = todo.description;
            editingId = todo.id;
            actionButton.textContent = "Update Todo";
        });
        deleteIcon.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });
        li.appendChild(todoTitle);
        li.appendChild(actions);
        list.appendChild(li);
    });
}
actionButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!title) {
        alert("Title is required!");
        return;
    }
    // In case of Edited
    if (editingId !== null) {
        const todo = todos.find(t => t.id === editingId);
        if (todo) {
            todo.title = title;
            todo.description = description;
            editingId = null;
            actionButton.textContent = "Add Todo";
        }
    }
    else {
        const newTodo = {
            id: Date.now(),
            title,
            description,
            done: false
        };
        todos.push(newTodo);
    }
    titleInput.value = '';
    descriptionInput.value = '';
    saveTodos();
    renderTodos();
});
// Initialize app
loadTodos();
renderTodos();
