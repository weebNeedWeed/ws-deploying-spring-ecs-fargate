// Helper to get stored data or initialize with defaults
const getStoredStats = () => {
  const stored = localStorage.getItem("dashboard_stats");
  if (stored) {
    return JSON.parse(stored);
  }

  // Default initial stats
  const initialStats = {
    userCount: Math.floor(Math.random() * 100) + 50, // Random between 50-150
    todoCount: Math.floor(Math.random() * 500) + 200, // Random between 200-700
    healthStatus: Math.random() > 0.2 ? "UP" : "DOWN", // 80% chance of being UP
  };

  localStorage.setItem("dashboard_stats", JSON.stringify(initialStats));
  return initialStats;
};

// Fetch dashboard statistics
export const fetchStats = () => {
  const token = localStorage.getItem("auth_token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  const fetchUserCount = fetch("/api/users/count", {
    method: "GET",
    headers,
  });
  const fetchTodoCount = fetch("/api/todos/count", {
    method: "GET",
    headers,
  });

  return Promise.all([fetchUserCount, fetchTodoCount])
    .then(([res1, res2]) => {
      if (!res1.ok || !res2.ok) {
        throw new Error("Failed to fetch statistics");
      }

      const userCount = res1.text();
      const todoCount = res2.text();

      return {
        userCount,
        todoCount,
        healthStatus: "UP",
      };
    })
    .catch((error) => {
      console.error("Error fetching statistics:", error);
      throw new Error("Failed to fetch statistics");
    });
};

// Reset statistics (for testing)
export const resetStats = () => {
  localStorage.removeItem("dashboard_stats");
  return getStoredStats();
};
