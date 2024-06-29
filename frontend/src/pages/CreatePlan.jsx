import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tooth from "../components/Tooth";
import api from "../api/api";
import PatientForm from "../components/PatientForm";
import PatientSelect from "../components/PatientSelect";
import TabNavigation from "../components/TabNavigation";
import DentalFormula from "../components/DentalFormula";
import Guidelines from "../components/Guidelines";
import Photos from "../components/Photos";
import TreatmentPlan from "../components/TreatmentPlan";

const CreatePlan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1 - Dental formula");
  const [initialStatus, setInitialStatus] = useState({});
  const [desiredStatus, setDesiredStatus] = useState({});
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [dentalFormula, setDentalFormula] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await api.get("/patients/get/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (currentPatient) {
      setPhotos(currentPatient.photos);
      setInitialStatus(currentPatient.teeth_status || {});
      setDesiredStatus(currentPatient.treatment_plan || {});
    }
  }, [currentPatient]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToothStatusChange = (id, status, step) => {
    if (step === 1) {
      setInitialStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
    } else if (step === 4) {
      setDesiredStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
    }
    setDentalFormula((prevFormula) => ({ ...prevFormula, [id]: status }));
  };

  const renderTeethArch = (numTeeth, step, statusData) => {
    const teeth = [];
    const radius = 100;
    const centerX = 150;

    // Render top teeth arch
    const centerYTop = 130;
    for (let i = 0; i < numTeeth; i++) {
      const angle = (Math.PI / (numTeeth - 1)) * i;
      const x = centerX + radius * Math.cos(angle) - 16;
      const y = centerYTop - radius * Math.sin(angle) - 16;

      const status = statusData[`top-${i}`];

      teeth.push(
        <Tooth
          key={`top-${i}`}
          id={`top-${i}`}
          className="absolute transform rotate-180"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
          step={step}
          status={status}
          handleToothStatusChange={handleToothStatusChange}
        />
      );
    }

    // Render bottom teeth arch
    const centerYBottom = 180;
    for (let i = 0; i < numTeeth; i++) {
      const angle = (Math.PI / (numTeeth - 1)) * i;
      const x = centerX + radius * Math.cos(angle) - 16;
      const y = centerYBottom + radius * Math.sin(angle) - 16;

      const status = statusData[`bottom-${i}`];

      teeth.push(
        <Tooth
          key={`bottom-${i}`}
          id={`bottom-${i}`}
          className="absolute transform"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
          step={step}
          status={status}
          handleToothStatusChange={handleToothStatusChange}
        />
      );
    }

    return teeth;
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await api.post(
        "/patients/",
        {
          name: patientName,
          diagnosis,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Patient saved:", response.data);
      setPatients((prevPatients) => [...prevPatients, response.data]);
      setCurrentPatient(response.data);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleUpdate = async () => {
    if (!currentPatient) {
      console.error("No patient selected");
      return;
    }
    const token = localStorage.getItem("access_token");
    try {
      const response = await api.put(
        `/patients/${currentPatient.id}/update/`,
        {
          name: patientName,
          diagnosis: diagnosis,
          teeth_status: initialStatus,
          treatment_plan: desiredStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Dental formula updated:", response.data);
      // Handle success (e.g., navigate to another page or show a success message)
    } catch (error) {
      console.error("Error updating dental formula:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handlePatientChange = (event) => {
    const patientId = event.target.value;
    const selectedPatient = patients.find(
      (patient) => patient.id === parseInt(patientId)
    );
    setCurrentPatient(selectedPatient);
    setPatientName(selectedPatient.name);
    setDiagnosis(selectedPatient.diagnosis);
    setInitialStatus(selectedPatient.teeth_status || {});
    setDesiredStatus(selectedPatient.treatment_plan || {});
    setPhotos(selectedPatient.photos || []);
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleFileUpload = async () => {
    if (!currentPatient) {
      console.error("No patient selected for file upload");
      return;
    }

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("patient_id", currentPatient.id);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("photos", selectedFiles[i]);
    }

    try {
      const response = await api.post("/patient/upload_photos/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Files uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="bg-white rounded-3xl w-4/5 p-8">
        <h1 className="text-xl font-medium mb-4">
          Create a new complex or local segment treatment plan for Your patient
          <button className="ml-4 py-1 px-4 text-base rounded-2xl border border-neutral-300">
            Add patient
          </button>
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Find a patient or plan..."
            className="w-full p-2 text-xs bg-white active:text-gray-200 px-4 text-gray-400 rounded-full hover:text-gray-500 border border-gray-900"
          />
        </div>
        <div>
          <PatientForm
            patientName={patientName}
            setPatientName={setPatientName}
            diagnosis={diagnosis}
            setDiagnosis={setDiagnosis}
            handleSave={handleSave}
          />
          {currentPatient && (
            <div className="mt-4">
              <h2 className="text-xl font-medium">
                Your current patient is {currentPatient.name}
              </h2>
            </div>
          )}
          <PatientSelect
            patients={patients}
            handlePatientChange={handlePatientChange}
          />
        </div>
        <div className="bg-stone-100 rounded-2xl p-4 mt-6">
          <TabNavigation
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
          {activeTab === "1 - Dental formula" && (
            <DentalFormula
              renderTeethArch={(numTeeth, step) =>
                renderTeethArch(numTeeth, step, initialStatus)
              }
              handleToothStatusChange={handleToothStatusChange}
              handleUpdate={handleUpdate}
              initialStatus={initialStatus}
            />
          )}
          {activeTab === "2 - Guidelines" && <Guidelines />}
          {activeTab === "3 - Photos" && (
            <Photos
              photos={photos}
              handleFileChange={handleFileChange}
              handleFileUpload={handleFileUpload}
            />
          )}
          {activeTab === "4 - TreatmentPlan" && (
            <TreatmentPlan
              renderTeethArch={(numTeeth, step) =>
                renderTeethArch(numTeeth, step, desiredStatus)
              }
              handleToothStatusChange={handleToothStatusChange}
              desiredStatus={desiredStatus}
              handleUpdate={handleUpdate}
            />
          )}
        </div>
      </div>
      {/* {pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <iframe
              src={pdfUrl}
              width="100%"
              height="400px"
              title="PDF Preview"
            ></iframe>
            <button
              onClick={downloadPDF}
              className="mt-4 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Download
            </button>
            <button
              onClick={() => setPdfUrl(null)}
              className="mt-4 py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
      <div style={{ display: "none" }}>
        {/* <PdfTemplate
          initialStatus={initialStatus}
          desiredStatus={desiredStatus}
          ref={pdfRef}
        /> */}
      </div>
    </div>
  );
};

export default CreatePlan;
