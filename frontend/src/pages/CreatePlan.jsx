import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Tooth from "../components/Tooth";
import PdfTemplate from "../components/PdfTemplate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CreatePlan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1 - Dental formula");
  const [initialStatus, setInitialStatus] = useState({});
  const [desiredStatus, setDesiredStatus] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);
  const pdfRef = useRef();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleToothStatusChange = (id, status, step) => {
    if (step === 1) {
      setInitialStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
    } else if (step === 4) {
      setDesiredStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
    }
  };

  const renderTeethArch = (numTeeth, isTop, step) => {
    const teeth = [];
    const radius = 100;
    const centerX = 150;
    const centerY = isTop ? 130 : 180;

    for (let i = 0; i < numTeeth; i++) {
      const angle = (Math.PI / (numTeeth - 1)) * i;
      const x = centerX + radius * Math.cos(angle) - 16;
      const y = centerY + (isTop ? -1 : 1) * radius * Math.sin(angle) - 16;

      teeth.push(
        <Tooth
          key={i}
          id={i}
          className={`absolute transform ${isTop ? "rotate-180" : ""}`}
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
          step={step}
          handleToothStatusChange={handleToothStatusChange}
        />
      );
    }
    return teeth;
  };

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    });
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "treatment-plan.pdf";
    link.click();
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen items-center">
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
        <h1 className="text-4xl font-medium mb-4">Patient: Inna Sergeeva</h1>
        {["Patient's name", "Diagnosis"].map((placeholder, index) => (
          <div className="mb-3" key={index}>
            <input
              type="text"
              className="block px-3 py-2 h-[35px] text-gray-400 rounded-full hover:text-gray-500 border border-gray-900 placeholder-opacity-30"
              placeholder={placeholder}
            />
          </div>
        ))}
        <div className="bg-stone-100 rounded-2xl p-4">
          <div className="flex h-[60px] justify-center space-x-4 mb-4 border border-neutral-300 rounded-3xl">
            {[
              "1 - Dental formula",
              "2 - Guidelines",
              "3 - Photos",
              "4 - Treatment Plan",
            ].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 rounded ${
                  activeTab === tab
                    ? "bg-white justify-items-center h-[50px] rounded-2xl text-gray-900 shadow-md"
                    : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "1 - Dental formula" && (
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/4 mb-4 lg:mb-0">
                <div className="space-y-4">
                  {["Implant", "Crown", "Filling", "Extracted"].map(
                    (text, index) => (
                      <button
                        key={index}
                        className="w-full py-2 px-4 rounded bg-white hover:bg-gray-100"
                      >
                        {text}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="relative w-[400px] h-[300px]">
                {renderTeethArch(16, true, 1)}
                {renderTeethArch(16, false, 1)}
              </div>
              <div className="lg:w-3/4 p-4 rounded-xl border border-neutral-300">
                <h2 className="text-lg font-medium mb-4">
                  Fill in patient's dental formula
                </h2>
                <p className="text-gray-600 mb-4">
                  1 - Click on the buttons on the left to choose the right
                  current status for the tooth or several teeth.
                  <br />2 - Click on every tooth to change its status. You can
                  choose several teeth at once to set the same status for them.
                </p>
                <button className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100">
                  Save
                </button>
              </div>
            </div>
          )}
          {activeTab === "2 - Guidelines" && <Guidelines />}
          {activeTab === "3 - Photos" && <Photos />}
          {activeTab === "4 - Treatment Plan" && (
            <TreatmentPlan
              renderTeethArch={renderTeethArch}
              generatePDF={generatePDF}
            />
          )}
        </div>
      </div>
      {pdfUrl && (
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
      )}
      <div style={{ display: "none" }}>
        <PdfTemplate
          initialStatus={initialStatus}
          desiredStatus={desiredStatus}
          ref={pdfRef}
        />
      </div>
    </div>
  );
};

const Guidelines = () => (
  <div className="p-4">
    <h2 className="text-xl font-medium mb-4">Guidelines</h2>
    <p className="text-gray-600">
      Here you can add guidelines for the treatment plan.
    </p>
  </div>
);

const Photos = () => (
  <div className="p-4">
    <h2 className="text-xl font-medium mb-4">Photos</h2>
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Add all your patient's photos and x-rays* to be used in a treatment
          plan presentation.
        </p>
      </div>
      <p className="text-sm text-gray-500">
        *- for the best result upload a minimum of 1 panoramic x-ray, 6
        intraoral and 2 portrait photos. Check "Help" section for guidelines on
        how to make those photos fast, easy and accurate.
      </p>
      <div className="flex space-x-4">
        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-blue-500 mb-2">Drag&Drop files here</p>
          <button className="text-blue-500 underline">Browse files</button>
        </div>
        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-blue-500 mb-2">Use from TxPlanPro database</p>
          <button className="text-blue-500 underline">
            Upload to database
          </button>
        </div>
      </div>
    </div>
  </div>
);

const TreatmentPlan = ({ renderTeethArch, generatePDF }) => (
  <div className="p-4">
    <h2 className="text-xl font-medium mb-4">Treatment Plan</h2>
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 mb-4 lg:mb-0">
        <div className="grid grid-cols-2 gap-4">
          {[
            "Implant",
            "Veneer",
            "Crown",
            "Sinus-Lift",
            "Inlay",
            "CTG",
            "Extraction",
            "Endo",
          ].map((text, index) => (
            <button
              key={index}
              className="py-2 px-4 rounded bg-white hover:bg-gray-100 border border-gray-300"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-[400px] h-[300px]">
        {renderTeethArch(16, true, 4)}
        {renderTeethArch(16, false, 4)}
      </div>
      <div className="lg:w-3/4 p-4 rounded-xl border border-neutral-300">
        <h2 className="text-lg font-medium mb-4">
          Fill in Your desired treatment for every tooth
        </h2>
        <p className="text-gray-600 mb-4">
          This will make your TxPlanPro presentation the most accurate and
          individualized.
          <br />
          You can also skip this step and get the fully Ai-generated plan, which
          You can edit later.
        </p>
        <div className="space-y-2">
          <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
            Skip and generate
          </button>
          <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
            Ai-based fill-in
          </button>
          <button
            className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100"
            onClick={generatePDF}
          >
            Generate plan
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CreatePlan;
