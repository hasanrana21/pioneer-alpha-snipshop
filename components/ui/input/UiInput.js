import React from "react";

const UiInput = ({ type, id, placeholder, inputClass, className }) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id}></label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`focus:outline-none text-base py-2 px-4 rounded-full w-full ${inputClass}`}
      />
    </div>
  );
};

export default UiInput;
