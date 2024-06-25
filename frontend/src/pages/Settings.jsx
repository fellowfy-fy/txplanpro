import React from "react";
import Tile from "../components/Tile";

const Settings = () => {
  const handleClick = (tile) => {
    console.log(`Clicked on ${tile}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Tile
          title="Clinic Logo and Photos"
          description="Interior and exterior photos of clinic"
          onClick={() => handleClick("Clinic Logo and Photos")}
        />
        <Tile
          title="Dental Care Photos"
          description="Photos describing your clinical care processes"
          onClick={() => handleClick("Dental Care Photos")}
        />
        <Tile
          title="Your Team"
          description="Doctors, Admins or Assistants"
          onClick={() => handleClick("Your Team")}
        />
        <Tile
          title="Static Texts"
          description="Describe your clinic and your care"
          onClick={() => handleClick("Static Texts")}
        />
        {/* Add more tiles as needed */}
      </div>
    </div>
  );
};

export default Settings;
