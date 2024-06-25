import React from "react";
import Tile from "../components/Tile";
import { useNavigate } from "react-router-dom";

const AllPlans = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/txplan/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Tile
          title="Patient: Melissa Kudrow"
          description="Missing teeth on both jaws, malaligned teeth"
          onClick={() => handleClick("melissa-kudrow")}
        />
        <Tile
          title="Patient: Inna Sergeeva"
          description="Tooth wear, failed passive eruption syndrome"
          onClick={() => handleClick("inna-sergeeva")}
        />
        {/* Add more tiles as needed */}
      </div>
    </div>
  );
};

export default AllPlans;
