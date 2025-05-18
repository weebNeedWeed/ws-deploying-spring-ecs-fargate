import React from "react";

const NeoBrutalistCard = ({
  children,
  color = "white",
  className = "",
  rotate = true,
}) => {
  return (
    <div
      className={`
      neo-card 
      bg-${color} 
      ${rotate ? "transform rotate-1" : ""} 
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default NeoBrutalistCard;
