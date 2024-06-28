import React, { useState, useEffect } from "react";

const Tooth = ({
  id,
  className,
  style,
  step,
  handleToothStatusChange,
  status: initialStatus,
}) => {
  const [status, setStatus] = useState(initialStatus || "default");

  useEffect(() => {
    setStatus(initialStatus || "default");
  }, [initialStatus]);

  const handleClick = () => {
    const newStatus = status === "default" ? "selected" : "default";
    setStatus(newStatus);
    handleToothStatusChange(id, newStatus, step);
  };

  const getColor = () => {
    return status === "selected" ? "bg-blue-500" : "bg-white";
  };

  return (
    <div
      onClick={handleClick}
      className={`w-5 h-5 ${getColor()} border border-gray-400 rounded-full cursor-pointer ${className}`}
      style={style}
    ></div>
  );
};

export default Tooth;
