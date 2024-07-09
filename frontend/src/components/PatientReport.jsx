import html2pdf from "html2pdf.js";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";

const PatientReport = ({ patient }) => {
  const contentRef = useRef();
  const { auth } = useAuth();

  const handleDownload = () => {
    const element = contentRef.current;
    const opt = {
      margin: 0,
      filename: "patient_report.pdf",
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "in", format: [16, 9], orientation: "landscape" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <div ref={contentRef} className="pb-10">
        {/* Clinic Photos */}
        <div className="relative w-[16in] h-[9in]">
          <img
            src={auth?.clinic_photos[0]?.photo}
            alt="Intro Photo"
            className="w-full h-full object-cover"
          />
          {auth?.static_text?.slide1 && (
            <div className="absolute bottom-12 left-12 text-white p-2">
              <div className="bg-transparent text-white text-3xl border border-white rounded-3xl p-3 font-bold">
                {auth.static_text.slide1}
              </div>

              <div>
                Patient: <span className="font-bold">{patient.name}</span>
              </div>
            </div>
          )}
        </div>
        <div className="relative w-[16in] h-[9in]">
          <img
            src={auth?.clinic_photos[1]?.photo}
            alt="Vision Photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-[16in] h-[9in]">
          <img
            src={auth?.clinic_photos[2]?.photo}
            alt="Break Photo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Patient Photos */}
        <div className="relative w-[16in] h-[9in]">
          <img
            src={patient?.photos[0]?.photo}
            alt="Patient Photo 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-[16in] h-[9in]">
          <img
            src={patient?.photos[1]?.photo}
            alt="Patient Photo 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-[16in] h-[9in]">
          <img
            src={patient?.photos[2]?.photo}
            alt="Patient Photo 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-[16in] h-[9in]">
          <img
            src={patient?.photos[3]?.photo}
            alt="Patient Photo 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-[16in] h-[8in]">
          <img
            src={patient?.photos[4]?.photo}
            alt="Patient Photo 5"
            className="w-full h-full object-cover"
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
