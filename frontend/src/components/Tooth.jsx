import React, { useState } from "react";

const Tooth = ({ id, className, style }) => {
  const [status, setStatus] = useState("default");

  const handleClick = () => {
    setStatus((prevStatus) =>
      prevStatus === "default" ? "selected" : "default"
    );
  };

  const getColor = () => {
    return status === "selected" ? "bg-blue-500" : "bg-white";
  };

  return (
    <div
      onClick={handleClick}
      className={`w-8 h-8 ${getColor()} border border-gray-400 rounded-full cursor-pointer ${className}`}
      style={style}
    ></div>
  );
};

export default Tooth;
