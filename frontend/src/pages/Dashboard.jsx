import React from "react";
import Tile from "../components/Tile";

const Dashboard = () => {
  const handleClick = (tile) => {
    console.log(`Clicked on ${tile}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to TxPlanPro</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Tile
          title="Patient: Johanna Doe"
          description="Details about Johanna's treatment plan"
          onClick={() => handleClick("Johanna Doe")}
        />
        <Tile
          title="Patient: Lisa Ann"
          description="Details about Lisa's treatment plan"
          onClick={() => handleClick("Lisa Ann")}
        />
        {/* Add more tiles as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
