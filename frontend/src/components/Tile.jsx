import React from "react";

const Tile = ({ title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg p-4 hover:bg-gray-100 transition"
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Tile;
