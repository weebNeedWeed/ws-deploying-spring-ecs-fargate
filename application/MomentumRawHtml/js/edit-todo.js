// Edit-todo.js - Handles editing functionality for todos

document.addEventListener("DOMContentLoaded", function () {
  // Get the todo ID from localStorage
  const todoId = localStorage.getItem("editTodoId");

  // If no todo ID is found, redirect to home page
  if (!todoId) {
    window.location.href = "home.html";
    return;
  }

  // Get todos from localStorage
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");

  // Find the todo to edit
  const todo = todos.find((t) => t.id === todoId);

  // If todo not found, redirect to home page
  if (!todo) {
    window.location.href = "home.html";
    return;
  }

  // Populate form fields with todo data
  document.getElementById("todo-title").value = todo.title;
  document.getElementById("todo-description").value = todo.description;
  document.getElementById("todo-priority").value = todo.priority;
  document.getElementById("todo-status").value = todo.status;
  document.getElementById("todo-due-date").value = todo.dueDate;

  // Handle form submission
  document
    .getElementById("edit-todo-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Update todo with form values
      todo.title = document.getElementById("todo-title").value;
      todo.description = document.getElementById("todo-description").value;
      todo.priority = document.getElementById("todo-priority").value;
      todo.status = document.getElementById("todo-status").value;
      todo.dueDate = document.getElementById("todo-due-date").value;

      // Save updated todos to localStorage
      localStorage.setItem("todos", JSON.stringify(todos));

      // Clear the edit todo ID
      localStorage.removeItem("editTodoId");

      // Redirect to home page
      window.location.href = "home.html";
    });
});
