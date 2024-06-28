import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await api.get(`/patients/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        &lt; Back to Plans
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 mb-4 md:mb-0">
          <img
            src={patient.xray}
            alt={patient.name}
            className="w-full h-auto"
          />
          {patient.photos.map((photo, index) => (
            <img
              key={index}
              src={photo.photo}
              alt={`Photo ${index}`}
              className="w-full h-auto mt-2"
            />
          ))}
        </div>
        <div className="flex-1 md:ml-4">
          <h1 className="text-2xl font-bold mb-2">Patient: {patient.name}</h1>
          <p className="text-gray-700 mb-4">{patient.diagnosis}</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-bold mb-2">Treatment Plan</h2>
            <pre className="text-gray-600">
              {JSON.stringify(patient.treatment_plan, null, 2)}
            </pre>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-bold mb-2">Teeth Status</h2>
            <pre className="text-gray-600">
              {JSON.stringify(patient.teeth_status, null, 2)}
            </pre>
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
