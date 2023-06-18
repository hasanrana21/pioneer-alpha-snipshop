import React from "react";

const UiLoader = () => {
  return (
    <div className="flex space-x-4 h-52 items-center justify-center">
      <span className="relative flex h-6 w-6 justify-center items-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
      </span>
      <span className="relative flex h-6 w-6 justify-center items-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
      </span>
      <span className="relative flex h-6 w-6 justify-center items-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
      </span>
    </div>
  );
};

export default UiLoader;
