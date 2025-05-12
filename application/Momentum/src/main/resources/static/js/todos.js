// Todos.js - Handles todo management functionality

// Sample todo data for demo purposes
const sampleTodos = [
  {
    id: "todo1",
    title: "Complete Project Proposal",
    description:
      "Finish the project proposal document with timeline and resource requirements.",
    priority: "high",
    status: "todo",
    dueDate: "2023-12-15",
  },
  {
    id: "todo2",
    title: "Schedule Team Meeting",
    description:
      "Set up weekly team sync to discuss project progress and blockers.",
    priority: "medium",
    status: "in-progress",
    dueDate: "2023-12-10",
  },
  {
    id: "todo3",
    title: "Research New Technologies",
    description:
      "Research and document potential new technologies for the upcoming project.",
    priority: "low",
    status: "done",
    dueDate: "2023-12-05",
  },
];

// Initialize todos from localStorage or use sample data
function initTodos() {
  let todos = localStorage.getItem("todos");
  if (!todos) {
    todos = JSON.stringify(sampleTodos);
    localStorage.setItem("todos", todos);
  }
  return JSON.parse(todos);
}

// Render todos based on current filters
function renderTodos() {
  const todosContainer = document.getElementById("todos-container");
  const template = document.getElementById("todo-item-template");
  const statusFilter = document.getElementById("filter-status").value;
  const priorityFilter = document.getElementById("filter-priority").value;
  const sortBy = document.getElementById("sort-by").value;

  // Clear container
  todosContainer.innerHTML = "";

  // Get todos and apply filters
  let todos = initTodos();

  // Apply status filter
  if (statusFilter !== "all") {
    todos = todos.filter((todo) => todo.status === statusFilter);
  }

  // Apply priority filter
  if (priorityFilter !== "all") {
    todos = todos.filter((todo) => todo.priority === priorityFilter);
  }

  // Apply sorting
  todos.sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return new Date(a.dueDate) - new Date(b.dueDate);
      case "date-desc":
        return new Date(b.dueDate) - new Date(a.dueDate);
      case "priority-desc":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "priority-asc":
        const priorityOrderAsc = { high: 3, medium: 2, low: 1 };
        return priorityOrderAsc[a.priority] - priorityOrderAsc[b.priority];
      default:
        return 0;
    }
  });

  // Render each todo
  todos.forEach((todo) => {
    const todoElement = document.importNode(template.content, true);

    // Set todo content
    todoElement.querySelector(".todo-title").textContent = todo.title;
    todoElement.querySelector(".todo-description").textContent =
      todo.description;
    todoElement.querySelector(".todo-due-date span").textContent = formatDate(
      todo.dueDate
    );

    // Set priority badge
    const priorityBadge = todoElement.querySelector(".priority");
    priorityBadge.textContent = todo.priority.toUpperCase();
    priorityBadge.classList.add(`priority-${todo.priority}`);

    // Set status badge
    const statusBadge = todoElement.querySelector(".status");
    statusBadge.textContent = formatStatus(todo.status);
    statusBadge.classList.add(`status-${todo.status}`);

    // Set change status button text based on current status
    const changeStatusBtn = todoElement.querySelector(".change-status");
    if (todo.status === "todo") {
      changeStatusBtn.textContent = "MARK AS IN PROGRESS";
    } else if (todo.status === "in-progress") {
      changeStatusBtn.textContent = "MARK AS DONE";
    } else {
      changeStatusBtn.textContent = "REOPEN";
    }

    // Add todo ID as data attribute
    const todoItem = todoElement.querySelector(".todo-item");
    todoItem.dataset.todoId = todo.id;

    // Add event listeners
    todoElement.querySelector(".edit-todo").addEventListener("click", () => {
      editTodo(todo.id);
    });

    todoElement
      .querySelector(".change-status")
      .addEventListener("click", () => {
        changeStatus(todo.id);
      });

    todoElement.querySelector(".delete-todo").addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    todosContainer.appendChild(todoElement);
  });

  // Show message if no todos match filters
  if (todos.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No todos match your filters";
    todosContainer.appendChild(emptyMessage);
  }
}

// Format date for display
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format status for display
function formatStatus(status) {
  switch (status) {
    case "todo":
      return "TO DO";
    case "in-progress":
      return "IN PROGRESS";
    case "done":
      return "DONE";
    default:
      return status.toUpperCase();
  }
}

// Edit todo
function editTodo(todoId) {
  localStorage.setItem("editTodoId", todoId);
  window.location.href = "edit.html";
}

// Change todo status
function changeStatus(todoId) {
  const todos = initTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    const todo = todos[todoIndex];

    // Update status based on current status
    if (todo.status === "todo") {
      todo.status = "in-progress";
    } else if (todo.status === "in-progress") {
      todo.status = "done";
    } else {
      todo.status = "todo";
    }

    // Save updated todos
    localStorage.setItem("todos", JSON.stringify(todos));

    // Re-render todos
    renderTodos();
  }
}

// Delete todo
function deleteTodo(todoId) {
  if (confirm("Are you sure you want to delete this todo?")) {
    const todos = initTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    // Save updated todos
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // Re-render todos
    renderTodos();
  }
}

// Add new todo
function addTodo(todoData) {
  const todos = initTodos();

  // Create new todo object
  const newTodo = {
    id: "todo" + Date.now(),
    title: todoData.title,
    description: todoData.description,
    priority: todoData.priority,
    status: "todo",
    dueDate: todoData.dueDate,
  };

  // Add to todos array
  todos.push(newTodo);

  // Save updated todos
  localStorage.setItem("todos", JSON.stringify(todos));

  // Re-render todos
  renderTodos();
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Render initial todos
  renderTodos();

  // Add event listeners for filters and sorting
  document
    .getElementById("filter-status")
    .addEventListener("change", renderTodos);
  document
    .getElementById("filter-priority")
    .addEventListener("change", renderTodos);
  document.getElementById("sort-by").addEventListener("change", renderTodos);

  // Add todo button
  document
    .getElementById("add-todo-btn")
    .addEventListener("click", function () {
      document.getElementById("add-todo-modal").style.display = "block";
    });

  // Cancel add todo
  document
    .getElementById("cancel-add-todo")
    .addEventListener("click", function () {
      document.getElementById("add-todo-modal").style.display = "none";
      document.getElementById("add-todo-form").reset();
    });

  // Add todo form submission
  document
    .getElementById("add-todo-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const todoData = {
        title: document.getElementById("todo-title").value,
        description: document.getElementById("todo-description").value,
        priority: document.getElementById("todo-priority").value,
        dueDate: document.getElementById("todo-due-date").value,
      };

      addTodo(todoData);

      // Reset form and hide modal
      document.getElementById("add-todo-form").reset();
      document.getElementById("add-todo-modal").style.display = "none";
    });
});
