import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import { fetchStats } from "../services/statsService";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    userCount: 0,
    todoCount: 0,
    healthStatus: "DOWN",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchStats();
        console.log("Fetched stats:", data);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats({
          userCount: 0,
          todoCount: 0,
          healthStatus: "DOWN",
        });
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl font-display">Loading dashboard data...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <header className="mb-12">
          <h1 className="text-7xl font-black transform -rotate-1 mb-2">
            Dashboard
          </h1>
          <p className="text-xl">
            Welcome back, <span className="font-bold">{user?.username}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            title="Total Users"
            value={stats.userCount}
            icon="👥"
            color="neo-blue"
          />

          <StatCard
            title="Total Todos"
            value={stats.todoCount}
            icon="✅"
            color="neo-yellow"
          />

          <StatCard
            title="System Status"
            value={stats.healthStatus}
            icon={stats.healthStatus === "UP" ? "✅" : "❌"}
            color={stats.healthStatus === "UP" ? "neo-blue" : "neo-red"}
            isStatus
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
