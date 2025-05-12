// todo.js - Handles todo operations

// Initialize todos from localStorage or empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Run on page load
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the home page
  if (window.location.href.includes("home.html")) {
    displayTodos();
    setupFiltersAndSort();
  }

  // Check if we're on the add todo page
  if (window.location.href.includes("add-todo.html")) {
    setupAddTodoForm();
  }

  // Check if we're on the edit todo page
  if (window.location.href.includes("edit.html")) {
    setupEditTodoForm();
  }
});

// Setup add todo form
function setupAddTodoForm() {
  const addTodoForm = document.getElementById("add-todo-form");
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const newTodo = {
        id: Date.now().toString(),
        title: document.getElementById("todo-title").value,
        description: document.getElementById("todo-description").value,
        priority: document.getElementById("todo-priority").value,
        dueDate: document.getElementById("todo-due-date").value,
        status: "todo",
        createdAt: new Date().toISOString(),
      };

      todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
      window.location.href = "home.html";
    });
  }
}

// Setup edit todo form
function setupEditTodoForm() {
  const todoId = new URLSearchParams(window.location.search).get("id");
  if (!todoId) {
    window.location.href = "home.html";
    return;
  }

  const todo = todos.find((t) => t.id === todoId);
  if (!todo) {
    window.location.href = "home.html";
    return;
  }

  // Populate form fields
  document.getElementById("todo-title").value = todo.title;
  document.getElementById("todo-description").value = todo.description;
  document.getElementById("todo-priority").value = todo.priority;
  document.getElementById("todo-status").value = todo.status;

  // Handle form submission
  const editTodoForm = document.getElementById("edit-todo-form");
  editTodoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    todo.title = document.getElementById("todo-title").value;
    todo.description = document.getElementById("todo-description").value;
    todo.priority = document.getElementById("todo-priority").value;
    todo.status = document.getElementById("todo-status").value;

    localStorage.setItem("todos", JSON.stringify(todos));
    window.location.href = "home.html";
  });
}

// Display todos on home page
function displayTodos() {
  const container = document.getElementById("todos-container");
  const template = document.getElementById("todo-item-template");

  // Clear existing todos
  container.innerHTML = "";

  // Apply filters and sort
  let filteredTodos = filterTodos(todos);
  filteredTodos = sortTodos(filteredTodos);

  // Display todos
  filteredTodos.forEach((todo) => {
    const todoElement = template.content.cloneNode(true);

    todoElement.querySelector(".todo-title").textContent = todo.title;
    todoElement.querySelector(".todo-description").textContent =
      todo.description;
    todoElement.querySelector(".todo-priority").textContent =
      todo.priority.toUpperCase();
    todoElement.querySelector(".todo-status").textContent =
      todo.status.toUpperCase();
    todoElement.querySelector(".todo-due-date").textContent = new Date(
      todo.dueDate
    ).toLocaleDateString();

    // Add priority class
    todoElement
      .querySelector(".todo-item")
      .classList.add(`priority-${todo.priority}`);

    // Setup edit button
    todoElement.querySelector(".edit-todo").href = `edit.html?id=${todo.id}`;

    // Setup delete button
    const deleteBtn = todoElement.querySelector(".delete-todo");
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    container.appendChild(todoElement);
  });
}

// Filter todos based on selected filters
function filterTodos(todos) {
  const statusFilter = document.getElementById("filter-status").value;
  const priorityFilter = document.getElementById("filter-priority").value;

  return todos.filter((todo) => {
    const statusMatch = statusFilter === "all" || todo.status === statusFilter;
    const priorityMatch =
      priorityFilter === "all" || todo.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });
}

// Sort todos based on selected sort option
function sortTodos(todos) {
  const sortBy = document.getElementById("sort-by").value;

  return todos.sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "date-asc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "priority-desc":
        return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
      case "priority-asc":
        return getPriorityWeight(a.priority) - getPriorityWeight(b.priority);
      default:
        return 0;
    }
  });
}

// Helper function to get priority weight for sorting
function getPriorityWeight(priority) {
  switch (priority) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 0;
  }
}

// Setup filters and sort change handlers
function setupFiltersAndSort() {
  const filterStatus = document.getElementById("filter-status");
  const filterPriority = document.getElementById("filter-priority");
  const sortBy = document.getElementById("sort-by");

  filterStatus.addEventListener("change", displayTodos);
  filterPriority.addEventListener("change", displayTodos);
  sortBy.addEventListener("change", displayTodos);
}

// Delete todo
function deleteTodo(id) {
  if (confirm("Are you sure you want to delete this todo?")) {
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
  }
}
