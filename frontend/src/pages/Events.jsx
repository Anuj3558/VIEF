"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";

// Helper function to truncate description to 10 words
const truncateDescription = (description, wordLimit = 10) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

export default function EventsPage() {
  const {
    upcomingEvents = [],
    pastEvents = [],
    loading,
    error,
  } = useContext(EventContext);

  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const EventSection = ({ title, events, showAll, setShowAll }) => (
    <section className="my-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        {title}
      </motion.h2>

      {loading ? (
        <div className="text-center text-lg font-medium text-gray-600">
          Loading events...
        </div>
      ) : error ? (
        <div className="text-center text-lg font-medium text-red-600">
          {error}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-600">
          No events available.
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {events
              .slice(0, showAll ? events.length : 6)
              .map((event, index) => (
                <motion.div
                  key={event._id || index}
                  variants={itemVariants}
                  className="relative group flex flex-col h-full"
                >
                  <div className="rounded-[2rem] border-2 border-gray-200 overflow-hidden bg-white flex flex-col h-full">
                    {/* Image section */}
                    <div className="relative flex-shrink-0 h-[250px] rounded-[2rem] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={event.image || "/placeholder-image.jpg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#FF4D00] transition-colors"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="text-[#1a237e] group-hover:text-white transition-colors rotate-[-45deg]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Card content */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex px-7 gap-4 border border-dashed border-gray-500 rounded-2xl p-2 mb-4">
                        <h3 className="text-[#1a237e] items-start flex text-center py-3 text-[16px] barlow-condensed-regular font-semibold flex-1">
                          {event.title.slice(0,30)}.....
                        </h3>
                        <div className="flex flex-col items-end gap-1 barlow-condensed-regular">
                          <span className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span
                            className={
                              event.mode === "ONLINE"
                                ? "text-[#00C944]"
                                : "text-[#FF4A11]"
                            }
                            text-sm
                          >
                            {event.mode === "ONLINE" ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 bg-[#FF4A11] text-white rounded-[1rem] p-4">
                        <p className="text-sm leading-relaxed">
                          {truncateDescription(event.description)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link to={`/event/${event._id}`} className="absolute inset-0">
                    <div className="w-full h-full absolute top-0 left-0 bg-transparent"></div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
          {events.length > 6 && (
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl font-medium text-[#1a237e] hover:text-[#FF4D00] transition-colors"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "Show Less" : "More"}
              </motion.button>
            </div>
          )}
        </>
      )}
    </section>
  );

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EventSection
          title="Upcoming Events"
          events={upcomingEvents}
          showAll={showAllUpcoming}
          setShowAll={setShowAllUpcoming}
        />
        <EventSection
          title="Past Events"
          events={pastEvents}
          showAll={showAllPast}
          setShowAll={setShowAllPast}
        />
      </div>
    </main>
  );
}
