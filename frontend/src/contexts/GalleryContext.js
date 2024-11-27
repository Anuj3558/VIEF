// src/contexts/GalleryContext.js
import React, { createContext, useState, useEffect } from "react";

export const GalleryContext = createContext();

const GalleryProvider = ({ children }) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the gallery data from the backend
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/gallery`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }
        const data = await response.json();
        setGallery(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);
  

  return (
    <GalleryContext.Provider value={{ gallery, loading, error }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
