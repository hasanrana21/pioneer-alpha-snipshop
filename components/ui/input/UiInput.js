import React from "react";

const UiInput = ({
  label,
  type,
  id,
  name,
  placeholder,
  inputClass,
  className,
  handleChange,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`focus:outline-none text-base py-2 px-4 rounded w-full border border-[#7DE1EF] ${inputClass}`}
        onChange={handleChange}
      />
    </div>
  );
};

export default UiInput;
