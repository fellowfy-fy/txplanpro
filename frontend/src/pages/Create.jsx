import React from "react";
import Tile from "../components/Tile";

const Create = () => {
  const handleClick = (tile) => {
    console.log(`Clicked on ${tile}`);
  };
  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <div className="p-[24px]">
        <h1 className="text-5xl font-medium mb-4">Patient: Patient's Name</h1>
        <h1 className="font-medium text-gray-500 opacity-80 mb-4">
          Upload patient diagnostic data, create treatment plan or a DSD project
        </h1>
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
    </div>
  );
};

export default Create;
