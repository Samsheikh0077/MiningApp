import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-900 rounded-full h-4 mt-4 overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
