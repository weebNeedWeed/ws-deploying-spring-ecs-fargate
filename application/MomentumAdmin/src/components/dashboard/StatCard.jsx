import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  color = "neo-yellow",
  isStatus = false,
}) => {
  // Determine text color for status values
  const statusTextColor =
    isStatus && value === "UP"
      ? "text-green-600"
      : isStatus
      ? "text-red-600"
      : "";

  return (
    <div className={`neo-card bg-${color} overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-display">{title}</h3>
        <span className="text-4xl">{icon}</span>
      </div>

      <div className="mt-2">
        <p className={`text-6xl font-black font-display ${statusTextColor}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
