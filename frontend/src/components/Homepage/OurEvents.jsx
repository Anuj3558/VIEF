"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EventContext } from "../../contexts/EventContext";

export default function EventsSectionHome() {
  const {
    upcomingEvents = [],
    pastEvents = [],
    loading,
    error,
  } = useContext(EventContext);

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

  const EventSection = ({ title, events }) => (
    <section className="">
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
            {events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event._id || index}
                variants={itemVariants}
                className="relative group flex flex-col bg-white rounded-[2rem] border-2 border-gray-200 overflow-hidden"
              >
                <div className="flex-1 relative rounded-[2rem] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={event.image || "/placeholder-image.jpg"}
                    alt={event.title}
                    className="w-full h-[250px] object-cover"
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

                <div className="flex-1 flex flex-col p-4">
                  <div className="flex px-7 gap-4 border border-dashed border-gray-500 rounded-2xl p-2 mb-4">
                    <h3 className="text-[#1a237e] items-start flex text-center py-3 text-[16px] barlow-condensed-regular font-semibold flex-1">
                      {event.title.slice(0,30)}.......
                    </h3>
                    <div className="flex flex-col items-end gap-1 barlow-condensed-regular">
                      <span className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      {event.mode === "ONLINE" ? (
                        <span className="text-[#00C944] text-sm">Online</span>
                      ): <span className="text-[#c90700] text-sm">Offline</span>}
                    </div>
                  </div>

                  {/* Reduced height for the orange box */}
                  <div className="flex-1 bg-[#FF4A11] items-center text-center align-middle justify-center text-white rounded-[1rem] p-3">
                    <p className="text-sm  text-center items-center justify-center">
                      {event.description.split(" ").slice(0, 23).join(" ")}...
                    </p>
                  </div>
                </div>

                <Link to={`/event/${event._id}`} className="absolute inset-0">
                  <div className="w-full h-full absolute top-0 left-0 bg-transparent"></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {events.length > 3 && (
            <div className="text-center">
              <Link
                to="/events"
                className="text-[#1a237e] hover:text-[#FF4D00] transition-colors text-lg underline"
              >
               More 
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );

  return (
    <main className=" ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EventSection title="Events" events={pastEvents} />
      </div>
    </main>
  );
}
