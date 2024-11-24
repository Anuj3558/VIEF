import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/events`
        );
        const allEvents = response.data;

        // Sort events into upcoming and past based on the current date
        const currentDate = new Date();
        const upcoming = allEvents.filter(
          (event) => new Date(event.date) >= currentDate
        );
        const past = allEvents.filter(
          (event) => new Date(event.date) < currentDate
        );

        // Sort upcoming and past events
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)); // Ascending order
        past.sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending order

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ upcomingEvents, pastEvents, loading }}>
      {children}
    </EventContext.Provider>
  );
};
