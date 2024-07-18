const PatientSelect = ({ patients, handlePatientChange }) => (
  <div className="mt-4 mb-4">
    <label htmlFor="existing-patients" className="block text-gray-700 mb-2">
      Select Existing Patient
    </label>
    <select
      id="existing-patients"
      className="block w-full p-2 border border-gray-300 rounded-lg"
      onChange={handlePatientChange}
    >
      <option value="">-- Select a patient --</option>
      {patients.map((patient) => (
        <option key={patient.id} value={patient.id}>
          {patient.name}
        </option>
      ))}
    </select>
  </div>
);

export default PatientSelect;
