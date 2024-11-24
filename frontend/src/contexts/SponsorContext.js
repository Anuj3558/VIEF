import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SponsorContext = createContext();

export const SponsorProvider = ({ children }) => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      
      

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/sponsor`);
        setSponsors(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
        setError("Failed to fetch sponsors.");
        setLoading(false);
      }
    };

    fetchSponsors();

    return () => {
      // Cleanup logic (if necessary)
      setSponsors([]);
      
    };
  }, []);


  return (
    <SponsorContext.Provider value={{ sponsors, loading, error }}>
      {children}
    </SponsorContext.Provider>
  );
};
