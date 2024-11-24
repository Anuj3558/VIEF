import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AwardContext = createContext();

export const AwardProvider = ({ children }) => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/awards`
        );
        setAwards(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching awards:", error);
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  return (
    <AwardContext.Provider value={{ awards, loading }}>
      {children}
    </AwardContext.Provider>
  );
};
