import React from "react";

const UiButton = ({ children, label, type, className, onClick }) => {
  return (
    <div onClick={onClick} className={`mt-5 ${className}`}>
      <button
        type={type}
        className="flex items-center border px-6 py-2 rounded bg-[#7DE1EF] text-white font-medium  text-lg"
      >
        <span className={children ? "mr-2" : ""}>{children}</span>
        {label}
      </button>
    </div>
  );
};

export default UiButton;
