import React from "react";

const AllPlans = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example tile, repeat as necessary */}
        <div className="border rounded-lg p-4 hover:bg-gray-100 transition">
          <h2 className="text-lg font-bold">Patient: Melissa Kudrow</h2>
          <p className="text-gray-600">
            Missing teeth on both jaws, malaligned teeth
          </p>
          <p className="text-gray-600">By Dr. Kristina Joe</p>
          <p className="text-gray-600">Presentation: Sep 2, 2024</p>
          <p className="text-gray-600">Status: To-do</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-100 transition">
          <h2 className="text-lg font-bold">Patient: Inna Sergeeva</h2>
          <p className="text-gray-600">
            Tooth wear, failed passive eruption syndrome
          </p>
          <p className="text-gray-600">By Dr. Roxane Max</p>
          <p className="text-gray-600">Presentation: Jul 19, 2024</p>
          <p className="text-gray-600">Status: To-do</p>
        </div>
        {/* Add more tiles as needed */}
      </div>
    </div>
  );
};

export default AllPlans;
