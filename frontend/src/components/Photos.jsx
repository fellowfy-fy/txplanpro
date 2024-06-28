const Photos = () => (
  <div className="p-4">
    <h2 className="text-xl font-medium mb-4">Photos</h2>
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Add all your patient's photos and x-rays* to be used in a treatment
          plan presentation.
        </p>
      </div>
      <p className="text-sm text-gray-500">
        *- for the best result upload a minimum of 1 panoramic x-ray, 6
        intraoral and 2 portrait photos. Check "Help" section for guidelines on
        how to make those photos fast, easy and accurate.
      </p>
      <div className="flex space-x-4">
        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-blue-500 mb-2">Drag&Drop files here</p>
          <button className="text-blue-500 underline">Browse files</button>
        </div>
        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-blue-500 mb-2">Use from TxPlanPro database</p>
          <button className="text-blue-500 underline">
            Upload to database
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Photos;
