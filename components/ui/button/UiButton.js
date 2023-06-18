import React from "react";

const UiButton = ({ label, type, className, onClick }) => {
  return (
    <div onClick={onClick} className={`mt-5 ${className}`}>
      <button
        type={type}
        className="border px-6 py-2 rounded bg-[#7DE1EF] text-white font-medium  text-lg"
      >
        {label}
      </button>
    </div>
  );
};

export default UiButton;
