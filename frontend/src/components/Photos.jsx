const Photos = ({ photos, handleFileChange, handleFileUpload }) => (
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
          <input type="file" multiple onChange={handleFileChange} />
          <button
            className="mt-4 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleFileUpload}
          >
            Upload Photos
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Uploaded Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo.photo}
                alt={`Patient photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Photos;
