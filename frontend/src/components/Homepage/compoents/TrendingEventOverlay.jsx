import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { EventContext } from "../../../contexts/EventContext";

const TrendingEventOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const COOKIE_NAME = "hasSeenTrendingEventOverlay";
  const { upcomingEvents } = useContext(EventContext);

  useEffect(() => {
    const hasSeenOverlay = Cookies.get(COOKIE_NAME);
    if (!hasSeenOverlay && upcomingEvents.length > 0) {
      setIsVisible(true);

      // Set cookie with 3-hour expiration
      const threeHoursFromNow = new Date(
        new Date().getTime() + 3 * 60 * 60 * 1000
      );
      Cookies.set(COOKIE_NAME, "true", {
        expires: threeHoursFromNow,
        path: "/",
        sameSite: "strict",
      });
    }
  }, [upcomingEvents]);

  const closeOverlay = () => {
    setIsVisible(false);
  };

  if (!isVisible || upcomingEvents.length === 0) return null;
  const sortedUpcomingEvents = [...upcomingEvents].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const event = sortedUpcomingEvents[0];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fade-in overflow-hidden">
        {event.image && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {event.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              • {event.mode}
            </p>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {event.description}
          </p>
          <div className="flex justify-between items-center">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF4D00] hover:bg-[#FF4D10]/90 text-white px-6 py-2.5 rounded-lg 
                transition duration-300 font-medium text-sm"
            >
              Apply Now
            </a>
            <button
              onClick={closeOverlay}
              className="text-gray-500 hover:text-gray-700 transition duration-300 
                px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingEventOverlay;
