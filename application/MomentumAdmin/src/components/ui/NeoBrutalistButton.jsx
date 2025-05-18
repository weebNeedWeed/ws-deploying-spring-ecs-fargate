import React from "react";

const NeoBrutalistButton = ({
  children,
  onClick,
  type = "button",
  color = "neo-yellow",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`neo-button bg-${color} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default NeoBrutalistButton;
