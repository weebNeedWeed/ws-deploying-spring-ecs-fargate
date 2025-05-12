// Auth.js - Handles authentication functionality

// Check if user is logged in
function checkAuth() {
  const user = localStorage.getItem("user");
  if (
    !user &&
    !window.location.href.includes("login.html") &&
    !window.location.href.includes("register.html")
  ) {
    window.location.href = "login.html";
  } else if (
    user &&
    (window.location.href.includes("login.html") ||
      window.location.href.includes("register.html"))
  ) {
    window.location.href = "home.html";
  }

  // Update user name in header if on authenticated pages
  if (user && document.getElementById("user-name")) {
    const userData = JSON.parse(user);
    document.getElementById("user-name").textContent = userData.name;
  }
}

// Run auth check on page load
document.addEventListener("DOMContentLoaded", function () {
  checkAuth();

  // Login form handler
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Simple validation
      if (!email || !password) {
        showError("Please fill in all fields");
        return;
      }

      // In a real app, this would be an API call
      // For demo purposes, we'll simulate successful login
      const userData = {
        id: "user123",
        name: email.split("@")[0],
        email: email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "home.html";
    });
  }

  // Register form handler
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // Simple validation
      if (!name || !email || !password || !confirmPassword) {
        showError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
      }

      // In a real app, this would be an API call
      // For demo purposes, we'll simulate successful registration
      const userData = {
        id: "user" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "home.html";
    });
  }

  // Logout button handler
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
});

// Helper function to show error messages
function showError(message) {
  const errorContainer = document.getElementById("error-container");
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = "block";

    // Hide error after 3 seconds
    setTimeout(function () {
      errorContainer.style.display = "none";
    }, 3000);
  }
}
