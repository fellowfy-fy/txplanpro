import React from "react";
import Tile from "../components/Tile";

const Create = () => {
  const handleClick = (tile) => {
    console.log(`Clicked on ${tile}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Your New Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Tile
          title="Complex Treatment Plan"
          description="AI-generated, fully customizable"
          onClick={() => handleClick("Complex Treatment Plan")}
        />
        <Tile
          title="Digital Smile Design"
          description="The core of your complex planning"
          onClick={() => handleClick("Digital Smile Design")}
        />
        <Tile
          title="Local Treatment Plan"
          description="Fast and easy for ongoing treatments"
          onClick={() => handleClick("Local Treatment Plan")}
        />
        {/* Add more tiles as needed */}
      </div>
    </div>
  );
};

export default Create;
