const DentalFormula = ({ renderTeethArch, handleUpdate, initialStatus }) => (
  <div className="flex flex-col lg:flex-row">
    <div className="lg:w-1/4 mb-4 lg:mb-0">
      <div className="space-y-4">
        {["Implant", "Crown", "Filling", "Extracted"].map((text, index) => (
          <button
            key={index}
            className="w-full py-2 px-4 rounded bg-white hover:bg-gray-100"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
    <div className="relative w-[400px] h-[300px]">
      {renderTeethArch(16, 1, initialStatus)}
    </div>
    <div className="lg:w-3/4 p-4 rounded-xl border border-neutral-300">
      <h2 className="text-lg font-medium mb-4">
        Fill in patient's dental formula
      </h2>
      <p className="text-gray-600 mb-4">
        1 - Click on the buttons on the left to choose the right current status
        for the tooth or several teeth.
        <br />2 - Click on every tooth to change its status. You can choose
        several teeth at once to set the same status for them.
      </p>
      <button
        className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
        onClick={handleUpdate}
      >
        Save Dental Formula
      </button>
    </div>
  </div>
);

export default DentalFormula;
