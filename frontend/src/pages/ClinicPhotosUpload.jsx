import { useState } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

const ClinicPhotosUpload = () => {
  const { auth, setAuth } = useAuth();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("clinic_photos", file);
    });

    setUploading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await api.post("doctor/upload_photos/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAuth((prevAuth) => ({
        ...prevAuth,
        clinic_photos: [
          ...prevAuth.clinic_photos,
          ...response.data.clinic_photos,
        ],
      }));
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("Failed to upload photos.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Clinic Photos</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {auth.clinic_photos && auth.clinic_photos.length > 0 ? (
          auth.clinic_photos.map((photo, index) => (
            <img
              key={index}
              src={photo.photo}
              alt={`Clinic Photo ${index + 1}`}
              className=" rounded-lg shadow-sm w-[100px] h-auto"
            />
          ))
        ) : (
          <p>No clinic photos available.</p>
        )}
      </div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Photos"}
      </button>
    </div>
  );
};

export default ClinicPhotosUpload;
