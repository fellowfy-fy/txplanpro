import html2pdf from "html2pdf.js";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";

const PatientReport = ({ patient }) => {
  const contentRef = useRef();
  const { auth } = useAuth();

  const handleDownload = () => {
    const element = contentRef.current;
    html2pdf()
      .from(element)
      .set({
        filename: "patient_report.pdf",
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { orientation: "portrait" },
      })
      .save();
  };

  return (
    <div>
      <div ref={contentRef} className="pb-10">
        {/* Clinic Photos */}
        <div className="page relative w-full h-auto">
          <img
            src={auth?.clinic_photos[0]?.photo}
            alt="Intro Photo"
            className="w-full h-auto"
          />
          {auth?.static_text?.slide1 && (
            <div className="absolute bottom-12 left-12 text-white bg-black bg-opacity-50 p-2 rounded">
              {auth.static_text.slide1}
              <br />
              {patient.name}
            </div>
          )}
        </div>
        <div className="page relative w-full h-auto">
          <img
            src={auth?.clinic_photos[1]?.photo}
            alt="Vision Photo"
            className="w-full h-auto"
          />
        </div>
        <div className="page relative w-full h-auto">
          <img
            src={auth?.clinic_photos[2]?.photo}
            alt="Break Photo"
            className="w-full h-auto"
          />
        </div>

        {/* Patient Photos */}
        <div className="page relative w-full h-auto">
          <img
            src={patient?.photos[0]?.photo}
            alt="Patient Photo 1"
            className="w-full h-auto"
          />
        </div>
        <div className="page relative w-full h-auto">
          <img
            src={patient?.photos[1]?.photo}
            alt="Patient Photo 2"
            className="w-full h-auto"
          />
        </div>
        <div className="page relative w-full h-auto">
          <img
            src={patient?.photos[2]?.photo}
            alt="Patient Photo 3"
            className="w-full h-auto"
          />
        </div>
        <div className="page relative w-full h-auto">
          <img
            src={patient?.photos[3]?.photo}
            alt="Patient Photo 4"
            className="w-full h-auto"
          />
        </div>
        <div className="page relative w-full h-auto">
          <img
            src={patient?.photos[4]?.photo}
            alt="Patient Photo 5"
            className="w-full h-auto"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-3 border border-black rounded-lg p-3"
      >
        Download PDF
      </button>
    </div>
  );
};

export default PatientReport;
