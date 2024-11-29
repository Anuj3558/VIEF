import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NewsletterContext = createContext();

export const NewsletterProvider = ({ children }) => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/newsletter`);
        setNewsletters(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <NewsletterContext.Provider value={{ newsletters, loading }}>
      {children}
    </NewsletterContext.Provider>
  );
};
