import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/mentors`
        );
        setMentors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);
  

  return (
    <MentorContext.Provider value={{ mentors, loading }}>
      {children}
    </MentorContext.Provider>
  );
};
