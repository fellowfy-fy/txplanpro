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
        {/* Page 1-3: Clinic and Patient Photos */}
        <div>
          {auth?.clinic_photos?.map((photo, index) => (
            <div key={index}>
              <img
                src={photo.photo}
                alt={`Clinic Photo ${index}`}
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
                alt={`Patient Photo ${index}`}
                className="w-full h-auto scale-75 mt-2"
              />
            </div>
          ))}
        </div>

        {/* Page 4: Occlusal Photos */}
        <div className="page">
          <div>
            <img
              src={patient?.occlusalUpperPhoto}
              alt="Upper jaw occlusal photo"
              className="w-full h-auto scale-75 mt-2"
            />
            <img
              src={patient?.occlusalLowerPhoto}
              alt="Lower jaw occlusal photo"
              className="w-full h-auto scale-75 mt-2"
            />
          </div>
          <p>
            This text is always here and doesn't change or get edited - it's
            part of the template
          </p>
        </div>

        {/* Page 5: Side Photos */}
        <div className="page">
          <div>
            <img
              src={patient?.rightSidePhoto}
              alt="Right side photo"
              className="w-full h-auto scale-75 mt-2"
            />
            <img
              src={patient?.leftSidePhoto}
              alt="Left side photo"
              className="w-full h-auto scale-75 mt-2"
            />
          </div>
          <p>
            This text is always here and doesn't change or get edited - it's
            part of the template
          </p>
        </div>

        {/* Page 6: Additional Clinical Photo */}
        <div className="page">
          <div>
            <img
              src={auth?.additionalClinicalPhoto}
              alt="Additional Clinical Photo"
              className="w-full h-auto scale-75 mt-2"
            />
          </div>
          <p>{auth?.staticText}</p>
          <p>
            This text is always here and doesn't change or get edited - it's
            part of the template
          </p>
        </div>

        {/* Page 7: Procedures and Financial Plan */}
        <div className="page">
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
            {patient.procedures?.map((procedure, index) => (
              <p key={index}>{`${index + 1} - ${
                procedure.name
              } - ${procedure.teeth.join(", ")} - ${procedure.count}`}</p>
            ))}
          </div>
          <div>
            <h1>Financial plan</h1>
            {patient.financialPlan?.map((item, index) => (
              <p key={index}>{`${index + 1} - ${
                item.name
              } - ${item.cost.toFixed(2)}$`}</p>
            ))}
          </div>
          <div>
            <img
              src={patient?.panoramicXRay}
              alt="Panoramic X-ray"
              className="w-full h-auto scale-75 mt-2"
            />
          </div>
        </div>

        {/* Page 8: Dental Formula */}
        <div className="page">
          <div className="dental-formula">
            {/* Implement dental formula here */}
          </div>
        </div>

        {/* Page 9: Initial Status and Treatment Plan */}
        <div className="page">
          <div>
            <h2>Initial tooth status in the formula (step 1)</h2>
            {/* List of initial statuses */}
          </div>
          <div>
            <h2>Treatment plan for each tooth (step 4)</h2>
            {/* List of treatment plans */}
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
