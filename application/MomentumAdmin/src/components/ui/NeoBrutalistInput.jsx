import React from "react";

const NeoBrutalistInput = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
  label,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-xl font-display mb-2 transform -rotate-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`neo-input w-full ${className}`}
      />
    </div>
  );
};

export default NeoBrutalistInput;
