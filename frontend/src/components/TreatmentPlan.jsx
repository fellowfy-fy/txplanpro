const TreatmentPlan = ({
  renderTeethArch,
  handleToothStatusChange,
  handleUpdate,
  desiredStatus,
}) => (
  <div className="p-4">
    <h2 className="text-xl font-medium mb-4">Treatment Plan</h2>
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 mb-4 lg:mb-0">
        <div className="grid grid-cols-2 gap-4">
          {[
            "Implant",
            "Veneer",
            "Crown",
            "Sinus-Lift",
            "Inlay",
            "CTG",
            "Extraction",
            "Endo",
          ].map((text, index) => (
            <button
              key={index}
              className="py-2 px-4 rounded bg-white hover:bg-gray-100 border border-gray-300"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-[400px] h-[300px]">
        {renderTeethArch(16, 4, desiredStatus)}
      </div>
      <div className="lg:w-3/4 p-4 rounded-xl border border-neutral-300">
        <h2 className="text-lg font-medium mb-4">
          Fill in Your desired treatment for every tooth
        </h2>
        <p className="text-gray-600 mb-4">
          This will make your TxPlanPro presentation the most accurate and
          individualized.
          <br />
          You can also skip this step and get the fully AI-generated plan, which
          you can edit later.
        </p>
        <div className="space-y-2">
          <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
            Skip and generate
          </button>
          <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
            AI-based fill-in
          </button>
          <button className="py-2 px-4 rounded-lg border border-neutral-300 hover:bg-gray-100">
            Generate plan
          </button>

          <button
            className="py-2 px-4 rounded-lg border border-neutral-300 mt-4 hover:bg-gray-100"
            onClick={handleUpdate}
          >
            Save Treatment Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default TreatmentPlan;
