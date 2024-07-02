import { useState, useEffect } from "react";

const useImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // This is necessary to avoid tainting the canvas
    img.src = src;
    img.onload = () => {
      setImage(img);
    };
  }, [src]);

  return [image];
};

export default useImage;
