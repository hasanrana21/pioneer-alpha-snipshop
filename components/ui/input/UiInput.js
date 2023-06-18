import React from "react";

const UiInput = ({
  label,
  type,
  id,
  name,
  value,
  placeholder,
  inputClass,
  className,
  handleChange,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="text-lg" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`focus:outline-none mt-2 text-base py-2 px-4 rounded w-full border border-[#7DE1EF] ${inputClass}`}
        onChange={handleChange}
        defaultValue={value}
      />
    </div>
  );
};

export default UiInput;
