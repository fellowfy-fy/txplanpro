const PatientForm = ({
  patientName,
  setPatientName,
  diagnosis,
  setDiagnosis,
  handleSave,
}) => (
  <div>
    <h1 className="text-4xl font-medium mb-4">Add New Patient</h1>
    {[
      {
        placeholder: "Patient's name",
        value: patientName,
        onChange: (e) => setPatientName(e.target.value),
      },
      {
        placeholder: "Diagnosis",
        value: diagnosis,
        onChange: (e) => setDiagnosis(e.target.value),
      },
    ].map((inputProps, index) => (
      <div className="mb-3" key={index}>
        <input
          type="text"
          className="block px-3 py-2 h-[35px] text-gray-400 rounded-full hover:text-gray-500 border border-gray-900 placeholder-opacity-30"
          placeholder={inputProps.placeholder}
          value={inputProps.value}
          onChange={inputProps.onChange}
        />
      </div>
    ))}
    <button
      className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
      onClick={handleSave}
    >
      Save Patient Info
    </button>
  </div>
);

export default PatientForm;
