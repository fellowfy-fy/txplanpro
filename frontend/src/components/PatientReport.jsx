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
    <div className="m-20">
      <div ref={contentRef}>
        {/* Clinic Photos */}
        <div className="relative w-[12in] h-[6in]">
          <img
            src={auth?.clinic_photos[0]?.photo}
            alt="Intro Photo"
            className="w-full h-full object-cover"
          />
          {auth?.static_text?.slide3 && (
            <div className="absolute bottom-12 left-12 text-white p-2">
              <div className="bg-transparent text-white text-3xl border border-white rounded-3xl p-3 font-bold">
                {auth.static_text.slide3}
              </div>

              <div>
                Patient: <span className="font-bold">{patient.name}</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative w-[12in] h-[6in]">
          <img
            src={auth?.clinic_photos[1]?.photo}
            alt="Vision Photo"
            className="w-full h-full object-cover"
          />
          {auth?.static_text?.slide2 && (
            <div className="absolute bottom-12 left-12 text-white p-2">
              <div className="bg-transparent text-white text-3xl border border-white rounded-3xl p-3 font-bold">
                {auth.static_text.slide2}
              </div>
            </div>
          )}
        </div>

        {/* Patient Photos */}
        <div className="mt-[60px]">
          <h1>Diagnosis Visualisation</h1>
          <div className="flex w-[75%] mt-[60px]">
            <div className="relative w-1/2 h-[6in]">
              <h2>Upper jaw</h2>
              <div>
                <img
                  src={patient?.photos[0]?.photo}
                  alt="Patient Photo 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="relative w-1/2 h-[6in] ">
              <div>
                <h2>Lower jaw</h2>
                <img
                  src={patient?.photos[1]?.photo}
                  alt="Patient Photo 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[60px]">
          <h1>Diagnosis Visualisation</h1>
          <div className="flex w-[75%] mt-[60px]">
            <div className="relative w-1/2 h-[6in]">
              <h2>Left side</h2>
              <div>
                <img
                  src={patient?.photos[2]?.photo}
                  alt="Patient Photo 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative w-1/2 h-[6in]">
              <h2>Right side</h2>
              <div>
                <img
                  src={patient?.photos[3]?.photo}
                  alt="Patient Photo 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-[12in] h-[6in]">
          <img
            src={auth?.clinic_photos[2]?.photo}
            alt="Break Photo"
            className="w-full h-full object-cover"
          />
          {auth?.static_text?.slide3 && (
            <div className="absolute bottom-12 left-12 text-white p-2">
              <div className="bg-transparent text-white text-3xl border border-white rounded-3xl p-3 font-bold">
                {auth.static_text.slide3}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative w-[12in] h-[6in]">
        <img
          src={patient?.photos[4]?.photo}
          alt="Patient Photo 5"
          className="w-full h-full object-cover"
        />
        {auth?.static_text?.slide5 && (
          <div className="absolute bottom-12 left-12 text-white p-2">
            <div className="bg-transparent text-white text-3xl border border-white rounded-3xl p-3 font-bold">
              {auth.static_text.slide5}
            </div>
          </div>
        )}
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
