import React from "react";
import { useParams } from "react-router-dom";

const PlanDetails = () => {
  const { id } = useParams();

  // Dummy data for demonstration
  const plans = {
    "lisa-ann-implants": {
      patientName: "Lisa Ann",
      description:
        "Missing teeth on upper and lower jaws, malaligned teeth, jaws atrophy, thin gingiva biotype",
      doctor: "Dr. John Doe",
      status: "Ready",
      presentationDate: "Jun 20, 2024",
      price: "12,500$",
      image: "path/to/lisa-ann-image.jpg", // Update with actual image path
    },
    // Add more plans as needed
  };

  const plan = plans[id];

  if (!plan) {
    return <div>Plan not found</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        &lt; Back to Plans
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 mb-4 md:mb-0">
          <img
            src={plan.image}
            alt={plan.patientName}
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 md:ml-4">
          <h1 className="text-2xl font-bold mb-2">
            Patient: {plan.patientName}
          </h1>
          <p className="text-gray-700 mb-4">{plan.description}</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-bold mb-2">Plan Details</h2>
            <p>
              <strong>Doctor:</strong> {plan.doctor}
            </p>
            <p>
              <strong>Status:</strong> {plan.status}
            </p>
            <p>
              <strong>Presentation:</strong> {plan.presentationDate}
            </p>
            <p>
              <strong>Price:</strong> {plan.price}
            </p>
          </div>
          <button className="bg-black text-white py-2 px-4 rounded w-full mb-2">
            Download/Send
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
            Edit Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
