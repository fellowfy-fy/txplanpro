import React from "react";
import Tile from "../components/Tile";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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
      <div className="flex justify-center mt-6">
        <button
          className="bg-black text-white py-2 px-4 rounded"
          onClick={() => navigate("/all-plans")}
        >
          View All Plans
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
        <button
          className="border rounded-lg p-4 hover:bg-gray-100 transition"
          onClick={() => navigate("/create")}
        >
          <h2 className="text-lg font-bold">CREATE NEW TxPlan</h2>
          <p className="text-gray-600">
            Create a treatment plan for a new or existing patient (mostly for
            local cases)
          </p>
        </button>
        <button
          className="border rounded-lg p-4 hover:bg-gray-100 transition"
          onClick={() => navigate("/create")}
        >
          <h2 className="text-lg font-bold">
            CREATE NEW Digital Smile Design project
          </h2>
          <p className="text-gray-600">
            Start a new plan from a DSD project (mostly for complex cases)
          </p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
