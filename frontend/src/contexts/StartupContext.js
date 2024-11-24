import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StartupContext = createContext();

export const StartupProvider = ({ children }) => {
  const [currentStartups, setCurrentStartups] = useState([]);
  const [successfulStartups, setSuccessfulStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/startups`
        );
        const startups = response.data;

        setCurrentStartups(
          startups.filter((startup) => startup.status === "Current")
        );
        setSuccessfulStartups(
          startups.filter((startup) => startup.status === "Successful")
        );
      } catch (err) {
        setError(err.message || "Failed to fetch startups.");
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  return (
    <StartupContext.Provider
      value={{ currentStartups, successfulStartups, loading, error }}
    >
      {children}
    </StartupContext.Provider>
  );
};
