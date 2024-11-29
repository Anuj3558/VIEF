import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CoWorkingContext = createContext();

export const CoWorkingProvider = ({ children }) => {
  const [coWorkingSpaces, setCoWorkingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoWorkingSpaces = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/coworking-spaces`
        );
        setCoWorkingSpaces(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coworking spaces:", error);
        setLoading(false);
      }
    };

    fetchCoWorkingSpaces();
  }, []);

  return (
    <CoWorkingContext.Provider value={{ coWorkingSpaces, loading }}>
      {children}
    </CoWorkingContext.Provider>
  );
};
