import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import api from "../api/api";
import usePhotoUpload from "../hooks/usePhotoUpload"; // Import the custom hook

const PatientReport = ({ patient }) => {
  const contentRef = useRef();
  const { auth } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    files,
    previews,
    uploading,
    handleFileChange,
    handleUpload,
    getPhotoIdByName,
  } = usePhotoUpload(); // Use the custom hook

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      const data = {
        auth: {
          static_text: auth.static_text,
          clinic_photos: auth.clinic_photos,
        },
        patient: {
          name: patient?.name,
          photos: patient?.photos,
          formatted_treatment_plan: formattedTreatmentPlan,
        },
        financial_plan: financialPlan,
        total: total,
      };

      const response = await api.post("/generate-pdf/", data, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "patient_report.pdf";
      link.click();
      setIsDownloading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
    }
  };

  const formatTreatmentPlan = (treatmentPlan) => {
    const formattedPlan = {};
    for (const [tooth, treatment] of Object.entries(treatmentPlan)) {
      if (treatment !== "default") {
        if (!formattedPlan[treatment]) {
          formattedPlan[treatment] = [];
        }
        formattedPlan[treatment].push(tooth);
      }
    }
    return formattedPlan;
  };

  const formattedTreatmentPlan = patient?.treatment_plan
    ? formatTreatmentPlan(patient.treatment_plan)
    : {};

  const calculateFinancialPlan = (formattedPlan, prices) => {
    const financialPlan = {};
    let total = 0;
    for (const [treatment, teeth] of Object.entries(formattedPlan)) {
      const price = prices[treatment] || 0;
      const cost = price * teeth.length;
      financialPlan[treatment] = { count: teeth.length, cost };
      total += cost;
    }
    return { financialPlan, total };
  };

  const { financialPlan, total } = calculateFinancialPlan(
    formattedTreatmentPlan,
    auth.prices
  );

  const getPhotoUrl = (name) => {
    const photo = auth.clinic_photos.find((p) => p.photo.includes(name));
    return photo
      ? photo.photo.startsWith("http")
        ? photo.photo
        : `${window.location.origin}${photo.photo}`
      : null;
  };

  const handleFileInputChange = async (e) => {
    const { name, files: inputFiles } = e.target;
    await handleFileChange(e);
    await handleUpload({ name, file: inputFiles[0] });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleDownload}
        className="mt-3 border border-black rounded-lg p-3"
        disabled={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download PDF"}
      </button>
      <div className="relative">
        <div ref={contentRef}>
          {/* First Slide */}
          <div className="relative w-full h-[9in]">
            <img
              src={previews["intro"] || getPhotoUrl("intro")}
              alt="Intro Photo"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              id={`file-input-intro`}
              name="intro"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <label
              htmlFor={`file-input-intro`}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            {auth?.static_text?.slide1 && (
              <div className="absolute top-[350px] left-12 text-white p-2">
                <div className="bg-transparent text-white text-6xl lg:text-4xl border border-white rounded-3xl p-3 font-normal">
                  {auth.static_text.slide1}
                </div>
                <div className="font-light text-4xl lg:text-2xl">
                  Patient: <span className="font-bold">{patient?.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Second Slide */}
          <div className="relative w-full h-[9in]">
            <img
              src={previews["vision"] || getPhotoUrl("vision")}
              alt="Vision Photo"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              id={`file-input-vision`}
              name="vision"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <label
              htmlFor={`file-input-vision`}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            {auth?.static_text?.slide2 && (
              <div className="absolute top-[200px] left-[120px] text-white p-2">
                <div className="bg-transparent text-white text-6xl lg:text-4xl border border-white rounded-3xl p-3 font-normal">
                  {auth.static_text.slide2}
                </div>
              </div>
            )}
            {auth?.static_text?.slide3 && (
              <div className="absolute top-[500px] right-[120px] text-white p-2">
                <div className="bg-transparent text-white text-2xl lg:text-xl border border-white rounded-3xl p-3 font-normal">
                  {auth.static_text.slide3}
                </div>
              </div>
            )}
          </div>

          {/* Third Slide */}
          <div className="relative w-full h-[9in] text-center font-extralight text-5xl lg:text-3xl">
            <h1 className="p-5">Diagnosis Visualisation</h1>
            <div className="flex">
              <div className="relative w-1/2">
                <h2 className="p-5">Upper jaw</h2>
                <div>
                  <img
                    src={patient?.photos[0]?.photo}
                    alt="Patient Photo 1"
                    className="w-full h-full object-cover p-10"
                  />
                </div>
              </div>
              <div className="relative w-1/2">
                <div>
                  <h2 className="p-5">Lower jaw</h2>
                  <img
                    src={patient?.photos[1]?.photo}
                    alt="Patient Photo 2"
                    className="w-full h-full object-cover p-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Slide */}
          <div className="relative w-full h-[9in] text-center font-extralight text-5xl lg:text-3xl">
            <h1 className="p-5">Diagnosis Visualisation</h1>
            <div className="flex">
              <div className="relative w-1/2">
                <h2 className="p-5">Left side</h2>
                <div>
                  <img
                    src={patient?.photos[2]?.photo}
                    alt="Patient Photo 3"
                    className="w-full h-full object-cover p-10"
                  />
                </div>
              </div>
              <div className="relative w-1/2">
                <h2 className="p-5">Right side</h2>
                <div>
                  <img
                    src={patient?.photos[3]?.photo}
                    alt="Patient Photo 4"
                    className="w-full h-full object-cover p-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fifth Slide */}
          <div className="relative w-full h-[9in]">
            <img
              src={previews["break"] || getPhotoUrl("break")}
              alt="Break Photo"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              id={`file-input-break`}
              name="break"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <label
              htmlFor={`file-input-break`}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            {auth?.static_text?.slide4 && (
              <div className="absolute top-[200px] right-12 text-white p-2">
                <div className="text-6xl lg:text-4xl py-5">
                  Surgical & Implant Treatment
                </div>
                <div className="bg-transparent text-white text-2xl lg:text-xl border border-white rounded-3xl p-3 font-normal">
                  {auth.static_text.slide4}
                </div>
              </div>
            )}
          </div>

          {/* Sixth Slide */}
          <div className="relative w-full h-[9in] text-center items-center">
            <img
              src={patient?.photos[4]?.photo}
              alt="Patient Photo 5"
              className="w-full h-[4in] object-cover"
            />
            <div>
              {auth?.static_text?.slide5 && (
                <div className="flex text-black">
                  <div className="w-1/3">
                    <div className="text-3xl lg:text-2xl font-semibold py-5">
                      Surgical & Implant Treatment
                    </div>
                    <div className="text-xl lg:text-lg font-extralight rounded-3xl">
                      {auth.static_text.slide5}
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="text-3xl lg:text-2xl font-semibold py-5">
                      Procedures
                    </div>
                    <div className="text-xl lg:text-lg font-extralight rounded-3xl">
                      {Object.entries(formattedTreatmentPlan).map(
                        ([treatment, teeth]) => (
                          <div key={treatment}>
                            <strong>
                              {treatment} [{teeth.length}]
                            </strong>
                            : {teeth.join(", ")}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="text-3xl lg:text-2xl font-semibold py-5">
                      Financial Plan
                    </div>
                    <div className="text-xl lg:text-lg font-extralight rounded-3xl">
                      {Object.entries(financialPlan).map(
                        ([treatment, { count, cost }]) => (
                          <div key={treatment}>
                            {treatment} [{count}] : ${cost}
                          </div>
                        )
                      )}
                      <strong>Total: ${total}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReport;
