import placeholder1 from "../assets/placeholder1.png";
import placeholder2 from "../assets/placeholder2.png";

const PatientReport = () => {
  <div>
    <div>
      <img src={placeholder1} alt="placeholder" />
      <img src={placeholder2} alt="placeholder" />
    </div>
    <div>
      <div>
        <h1>Surgical and implant treatment</h1>
        <p>
          By combining surgical guides, bone grafting, and soft tissue grafting,
          we can offer you a comprehensive approach to dental implant treatment.
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
  </div>;
};
export default PatientReport;
