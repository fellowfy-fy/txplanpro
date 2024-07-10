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
        {/* первый слайд */}
        <div className="relative w-[16in] h-[9in]">
          <img
            src={auth?.clinic_photos[0]?.photo}
            alt="Intro Photo"
            className="w-full h-full object-cover"
          />
          {auth?.static_text?.slide3 && (
            <div className="absolute top-[350px] left-12 text-white p-2">
              <div className="bg-transparent text-white text-6xl border border-white rounded-3xl p-3 font-normal">
                {auth.static_text.slide3}
              </div>

              <div className="font-light text-4xl">
                Patient: <span className="font-bold">{patient.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* второй слайд */}
        <div className="relative w-[16in] h-[9in]">
          <img
            src={auth?.clinic_photos[1]?.photo}
            alt="Vision Photo"
            className="w-full h-full object-cover"
          />
          {auth?.static_text?.slide2 && (
            <div className="absolute top-[200px] left-[120px] text-white p-2">
              <div className="bg-transparent text-white text-6xl border border-white rounded-3xl p-3 font-normal">
                {auth.static_text.slide2}
              </div>
            </div>
          )}
        </div>

        {/* третий слайд */}
        <div className="relative w-[16in] h-[9in] text-center font-extralight text-5xl">
          <h1 className="p-5">Diagnosis Visualisation</h1>
          <div className="flex">
            <div className="relative w-1/2">
              <h2 className="p-5">Upper jaw</h2>
              <div>
                <img
                  src={patient?.photos[0]?.photo}
                  alt="Patient Photo 1"
                  className=" object-cover p-10"
                />
              </div>
            </div>
            <div className="relative w-1/2">
              <div>
                <h2 className="p-5">Lower jaw</h2>
                <img
                  src={patient?.photos[1]?.photo}
                  alt="Patient Photo 2"
                  className=" object-cover p-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* четвертый слайд */}
        <div className="relative w-[16in] h-[9in] text-center font-extralight text-5xl">
          <h1 className="p-5">Diagnosis Visualisation</h1>
          <div className="flex">
            <div className="relative w-1/2">
              <h2 className="p-5">Left side</h2>
              <div>
                <img
                  src={patient?.photos[2]?.photo}
                  alt="Patient Photo 3"
                  className="object-cover p-10"
                />
              </div>
            </div>
            <div className="relative w-1/2">
              <h2 className="p-5">Right side</h2>
              <div>
                <img
                  src={patient?.photos[3]?.photo}
                  alt="Patient Photo 4"
                  className="object-cover p-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* пятый слайд */}
        <div className="relative w-[16in] h-[9in]">
          <img
            src={auth?.clinic_photos[2]?.photo}
            alt="Break Photo"
            className="w-full h-full object-cover"
          />

          {auth?.static_text?.slide3 && (
            <div className="absolute top-[200px] right-12 text-white p-2">
              <div className="text-6xl py-5">Surgical & Implant Treatment</div>
              <div className="bg-transparent text-white text-2xl border border-white rounded-3xl p-3 font-normal">
                {auth.static_text.slide3}
              </div>
            </div>
          )}
        </div>

        {/* последний слайд */}
        <div className="relative w-[16in] h-[9in] text-center items-center">
          <img
            src={patient?.photos[4]?.photo}
            alt="Patient Photo 5"
            className="w-full h-[4in] "
          />
          <div>
            {auth?.static_text?.slide5 && (
              <div className="flex text-black">
                <div className="w-1/3">
                  <div className="text-3xl font-semibold py-5">
                    Surgical & Implant Treatment
                  </div>
                  <div className="text-xl font-extralight rounded-3xl">
                    {auth.static_text.slide5}
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="text-3xl font-semibold py-5">Procedures</div>
                  <div className="text-xl font-extralight rounded-3xl">
                    {auth.static_text.slide5}
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="text-3xl font-semibold py-5">
                    Financial plan
                  </div>
                  <div className="text-xl font-extralight rounded-3xl">
                    {auth.static_text.slide5}
                  </div>
                </div>
              </div>
            )}
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
