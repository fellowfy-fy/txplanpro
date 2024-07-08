import placeholder1 from "../assets/placeholder1.png";
import placeholder2 from "../assets/placeholder2.png";
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
        margin: 1,
        filename: "patient_report.pdf",
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { orientation: "portrait" },
      })
      .save();
  };

  return (
    <div>
      <div ref={contentRef} className="pb-10">
        <div>
          {auth?.clinic_photos?.map((photo, index) => (
            <div key={index}>
              <img
                src={photo.photo}
                alt={`Photo ${index}`}
                className="w-full h-auto scale-75 mt-2"
              />
            </div>
          ))}
        </div>
        <div>
          {patient?.photos?.map((photo, index) => (
            <div key={index}>
              <img
                src={photo.photo}
                alt={`Photo ${index}`}
                className="w-full h-auto scale-75 mt-2"
              />
            </div>
          ))}
        </div>
        <div>
          <div>
            <h1>{patient.name}</h1>
            <h1>Surgical and implant treatment</h1>
            <p>
              By combining surgical guides, bone grafting, and soft tissue
              grafting, we can offer you a comprehensive approach to dental
              implant treatment.
            </p>
          </div>
          <div>
            <h1>Procedures</h1>
            <p>1 - Extractions - 18, 24, 38, 47 - 4</p>
            <p>2 - Implant placement - 15, 14, 24, 26, 36, 46 - 6</p>
          </div>
          <div>
            <h1>Financial plan</h1>
            <p>1 - Extractions - 1000.00$</p>
            <p>2 - Implant placement - 7 500.00$</p>
          </div>
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
