import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SchemeContext = createContext();

export const SchemeProvider = ({ children }) => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/scheme`);
        setSchemes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schemes:", error);
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);
 

  return (
    <SchemeContext.Provider value={{ schemes, loading }}>
      {children}
    </SchemeContext.Provider>
  );
};
