import { useState, useEffect } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

const usePhotoUpload = () => {
  const { auth, setAuth } = useAuth();
  const [files, setFiles] = useState({
    intro: null,
    vision: null,
    break: null,
  });
  const [previews, setPreviews] = useState({
    intro: null,
    vision: null,
    break: null,
  });
  const [uploading, setUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    if (auth.clinic_photos) {
      setPreviews({
        intro: getPhotoUrl("intro"),
        vision: getPhotoUrl("vision"),
        break: getPhotoUrl("break"),
      });
    }
  }, [auth.clinic_photos]);

  useEffect(() => {
    if (fileToUpload) {
      handleUpload(fileToUpload.name);
    }
  }, [fileToUpload]);

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

    // Set the file to be uploaded
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
      `${name}.${file.name.split(".").pop()}`,
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
        `/clinic_photo/${photoId}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedPhoto = response.data;
      setAuth((prevAuth) => ({
        ...prevAuth,
        clinic_photos: prevAuth.clinic_photos.map((photo) =>
          photo.id === photoId ? { ...photo, photo: updatedPhoto.photo } : photo
        ),
      }));
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

  const getPhotoUrl = (name) => {
    const photo = auth.clinic_photos.find((p) => p.photo.includes(name));
    return photo
      ? photo.photo.startsWith("http")
        ? photo.photo
        : `${window.location.origin}${photo.photo}`
      : null;
  };

  const getPhotoIdByName = (name) => {
    const photo = auth.clinic_photos.find((p) => p.photo.includes(name));
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
