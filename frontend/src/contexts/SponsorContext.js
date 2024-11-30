import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SponsorContext = createContext();

export const SponsorProvider = ({ children }) => {
  const [partnerships, setPartnerships] = useState([]);
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/sponsor`
        );
        const allSponsors = response.data;

        // Split sponsors into partnerships and supporters
        const partnershipData = allSponsors.filter(
          (sponsor) => sponsor.type === "partnership"
        );
        const supporterData = allSponsors.filter(
          (sponsor) => sponsor.type === "supporter"
        );

        setPartnerships(partnershipData);
        setSupporters(supporterData);
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
      setPartnerships([]);
      setSupporters([]);
    };
  }, []);

  return (
    <SponsorContext.Provider
      value={{ partnerships, supporters, loading, error }}
    >
      {children}
    </SponsorContext.Provider>
  );
};
