import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePlan = () => {
  const navigate = useNavigate();
  return (
    <div className="ml-10 mr-20 bg-white rounded-3xl">
      <div className="p-[24px]">
        <h1 className="text-5xl font-medium mb-4">
          Create a new complex or local segment treatment plan for Your patient
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Find a patient"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-medium mb-4">Patient: Inna Sergeeva</h1>
        <div className="font-medium text-gray-500 opacity-80 mb-4">
          Upload patient diagnostic data, create treatment plan or a DSD project
        </div>
        <div className="flex space-x-4 mb-4">
          <button className="py-2 px-4 bg-gray-300 rounded">
            1 - Dental formula
          </button>
          <button className="py-2 px-4 bg-gray-100 rounded">
            2 - Guidelines
          </button>
          <button className="py-2 px-4 bg-gray-100 rounded">3 - Photos</button>
          <button className="py-2 px-4 bg-gray-100 rounded">
            4 - Treatment Plan
          </button>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 mb-4 lg:mb-0">
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-gray-200 rounded">
                Implant
              </button>
              <button className="w-full py-2 px-4 bg-gray-200 rounded">
                Crown
              </button>
              <button className="w-full py-2 px-4 bg-gray-200 rounded">
                Filling
              </button>
              <button className="w-full py-2 px-4 bg-gray-200 rounded">
                Extracted
              </button>
            </div>
          </div>
          <div className="lg:w-3/4 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium mb-4">
              Fill in patient's dental formula
            </h2>
            <p className="text-gray-600 mb-4">
              1 - Click on the buttons on the left to choose the right current
              status for the tooth or several teeth.
              <br />2 - Click on every tooth to change its status. You can
              choose several teeth at once to set the same status for them.
            </p>
            <button className="py-2 px-4 bg-blue-500 text-white rounded">
              AI-based fill-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlan;
