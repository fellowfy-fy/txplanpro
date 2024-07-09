import React, { useState, useEffect } from "react";
import { toothImages } from "./DentalFormula";

const Tooth = ({
  id,
  className,
  style,
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
    if (handleToothStatusChange) {
      handleToothStatusChange(id, newStatus);
    }
  };

  if (!toothImages[id]) {
    console.error(`No image found for tooth ${id}`);
    return null;
  }

  const toothImage = toothImages[id][status] || toothImages[id].default;

  return (
    <div
      onClick={handleClick}
      className={`w-8 h-8 cursor-pointer ${className || ""}`}
      style={style}
    >
      <img src={toothImage} alt={`Tooth ${id}`} className="w-full h-full" />
    </div>
  );
};

export default Tooth;
