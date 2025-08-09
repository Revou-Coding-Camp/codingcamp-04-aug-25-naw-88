let todoList = [];

function validateForm() {
  const todoInput = document.getElementById('todo-input').value.trim();
  const dateInput = document.getElementById('date-input').value;

  if (!todoInput || !dateInput) {
    alert('Please enter a todo item and a due date.');
    return;
  }

  addTodo(todoInput, dateInput);
  document.getElementById('todo-input').value = '';
  document.getElementById('date-input').value = '';
}

function addTodo(task, date) {
  todoList.push({ task, date, completed: false });
  displayTodos();
}

function displayTodos(list = todoList) {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  if (list.length === 0) {
    todoListElement.innerHTML = `<tr><td colspan="4" class="text-center text-gray-500 p-4">No tasks added yet.</td></tr>`;
    return;
  }

  list.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2">${item.task}</td>
      <td class="p-2">${item.date}</td>
      <td class="p-2">${item.completed ? 'Done' : 'Pending'}</td>
      <td class="p-2">
        <button onclick="toggleStatus(${index})" class="text-blue-500 mr-2">Toggle</button>
        <button onclick="deleteTodo(${index})" class="text-red-500">Delete</button>
      </td>
    `;
    todoListElement.appendChild(row);
  });
}

function toggleStatus(index) {
  todoList[index].completed = !todoList[index].completed;
  displayTodos();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  displayTodos();
}

function clearTodos() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todoList = [];
    displayTodos();
  }
}

function filterTodos() {
  const filtered = todoList.filter(item => !item.completed);
  displayTodos(filtered);
}
