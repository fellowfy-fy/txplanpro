import { useState, useEffect } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

const usePhotoUpload = (photoType, patient) => {
  const { auth, setAuth } = useAuth();
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [uploading, setUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    if (photoType === "clinic" && auth && auth.clinic_photos) {
      const initialPreviews = {};
      auth.clinic_photos.forEach((photo) => {
        initialPreviews[photo.field] = photo.photo;
      });
      console.log("Previews Clinic");
      console.log(initialPreviews);
      console.log("Clinic Photos");
      console.log(auth.clinic_photos);
      setPreviews(initialPreviews);
    } else if (photoType === "patient" && patient && patient.photos) {
      const initialPreviews = {};
      patient.photos.forEach((photo) => {
        initialPreviews[photo.field] = photo.photo;
      });
      console.log("Previews");
      console.log(initialPreviews);
      console.log("Patient Photos");
      console.log(patient.photos);
      setPreviews(initialPreviews);
    }
  }, [auth, patient, photoType]);

  const handleFileChange = async (e) => {
    const { name, files: inputFiles } = e.target;
    const file = inputFiles[0];
    if (!file) return;

    // Set the file for upload
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
    }));

    // Set the preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        [name]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
    setFileToUpload({ name, file });
  };

  const handleUpload = async ({ name, file }) => {
    const photoId = getPhotoIdByName(name);
    if (!file || !photoId) {
      console.log("ERROR", { name, photoId, file });
      return;
    }

    const renamedFile = new File(
      [file],
      `${name}-${photoId}.${file.name.split(".").pop()}`,
      {
        type: file.type,
      }
    );

    const formData = new FormData();
    formData.append("photo", renamedFile);

    setUploading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await api.put(
        `/${photoType}_photo/${photoId}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedPhoto = response.data;
      if (photoType === "clinic") {
        setAuth((prevAuth) => ({
          ...prevAuth,
          clinic_photos: prevAuth.clinic_photos.map((photo) =>
            photo.id === photoId
              ? { ...photo, photo: updatedPhoto.photo }
              : photo
          ),
        }));
      } else if (photoType === "patient") {
        patient.photos = patient.photos.map((photo) =>
          photo.id === photoId ? { ...photo, photo: updatedPhoto.photo } : photo
        );
      }
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        [name]: updatedPhoto.photo,
      }));
      alert(`${name} photo uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${name} photo:`, error);
      alert(`Failed to upload ${name} photo.`);
    } finally {
      setUploading(false);
      setFileToUpload(null); // Reset fileToUpload after upload
    }
  };

  const getPhotoIdByName = (name) => {
    let photo;
    if (photoType === "clinic") {
      photo = auth.clinic_photos.find((p) => p.photo.includes(name));
    } else if (photoType === "patient") {
      photo = patient.photos.find((p) => p.photo.includes(name));
    }
    return photo ? photo.id : null;
  };

  return {
    files,
    previews,
    uploading,
    handleFileChange,
    handleUpload,
    getPhotoIdByName,
  };
};

export default usePhotoUpload;
