let todos = [];
let currentFilter = 'all';

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function filterTodos(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    
    // Filter todos based on current filter
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }
    
    // Update stats
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('activeTasks').textContent = active;
    document.getElementById('completedTasks').textContent = completed;
    
    // Render todos
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state"><p>No tasks to show! 🎉</p></div>';
        return;
    }
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
    `).join('');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

// Initial render
renderTodos();