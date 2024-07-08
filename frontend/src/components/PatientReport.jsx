import placeholder1 from "../assets/placeholder1.png";
import placeholder2 from "../assets/placeholder2.png";

const PatientReport = () => {
  return (
    <div>
      {/* Page 4 */}
      <div className="page">
        <div>
          <img src={placeholder1} alt="Upper jaw occlusal photo" />
          <img src={placeholder2} alt="Lower jaw occlusal photo" />
        </div>
        <div>
          <p>
            This text is always here and doesn't change or get edited - it's
            part of the template
          </p>
        </div>
      </div>

      {/* Page 5 */}
      <div className="page">
        <div>
          <img src={placeholder1} alt="Right side photo" />
          <img src={placeholder2} alt="Left side photo" />
        </div>
        <div>
          <p>
            This text is always here and doesn't change or get edited - it's
            part of the template
          </p>
        </div>
      </div>

      {/* Page 6 */}
      <div className="page">
        <div>
          <img src={placeholder1} alt="Background photo from Clinical Photos" />
        </div>
        <div>
          <p>Static text from "Static texts" section</p>
          <p>
            This text is always here and doesn't change or get edited - it's
            part of the template
          </p>
        </div>
      </div>

      {/* Page 7 */}
      <div className="page">
        <div>
          <h1>Procedures</h1>
          {/* Dynamic text - sequence number, procedure name from step 4 Create, tooth numbers, number of procedures */}
          <p>1 - Extractions - 18, 24, 38, 47 - 4</p>
          <p>2 - Implant placement - 15, 14, 24, 26, 36, 46 - 6</p>
        </div>
        <div>
          <h1>Financial plan</h1>
          {/* Dynamic text - sequence number, procedure name from step 4 Create, cost - quantity multiplied by procedure cost from Settings-Prices */}
          <p>1 - Extractions - 1000.00$</p>
          <p>2 - Implant placement - 7 500.00$</p>
        </div>
        <div>
          <img src={placeholder1} alt="Panoramic X-ray from step 3 Create" />
        </div>
      </div>

      {/* Page 8 */}
      <div className="page">
        {/* Dental formula */}
        {/* This will need a more complex implementation */}
        <div className="dental-formula">
          {/* Implement dental formula here */}
        </div>
      </div>

      {/* Page 9 */}
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
  );
};

export default PatientReport;
