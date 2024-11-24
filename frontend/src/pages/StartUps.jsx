"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const StartupCard = ({ name, logo, website }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center"
  >
    <div className="w-full max-w-[280px] overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square ">
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-full object-contain"
        />
      </div>
      <div className="bg-[#1a237e] py-2 px-4">
        <h3 className="text-center text-white font-medium">{name}</h3>
      </div>
      <motion.a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-2 px-4 text-center text-[#1a237e] hover:text-[#FF4D00] transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center gap-2">
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </span>
      </motion.a>
    </div>
  </motion.div>
);

const StartupSection = ({ title, startups }) => {
  const [showAll, setShowAll] = useState(false); // State to control whether to show all startups

  const handleShowAll = () => {
    setShowAll(true); // Show all startups when "More" is clicked
  };

  return (
    <section className="my-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-12"
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {startups.length === 0 ? (
          <div className="col-span-full text-center text-xl text-gray-500">
            No startups found
          </div>
        ) : (
          (showAll ? startups : startups.slice(0, 6)).map((startup, index) => (
            <StartupCard key={index} {...startup} />
          ))
        )}
      </div>
      {!showAll && startups.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowAll}
            className="text-xl underline font-medium text-[#1a237e] hover:text-[#FF4D00] transition-colors"
          >
            More
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default function StartupsPage() {
  const [currentStartups, setCurrentStartups] = useState([]); // State for current startups
  const [successfulStartups, setSuccessfulStartups] = useState([]); // State for successful startups

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        // Fetching Current Startups
        const currentResponse = await axios.get(
          "http://localhost:5000/api/startups"
        ); // Replace with the correct route if needed
        setCurrentStartups(
          currentResponse.data.filter((startup) => startup.status === "Current")
        );

        // Fetching Successful Startups
        const successfulResponse = await axios.get(
          "http://localhost:5000/api/startups"
        ); // Same endpoint, filter for Successful
        setSuccessfulStartups(
          successfulResponse.data.filter(
            (startup) => startup.status === "Successful"
          )
        );
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchStartups();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StartupSection title="Current Startups" startups={currentStartups} />
        <StartupSection
          title="Successful Startups"
          startups={successfulStartups}
        />
      </main>
    </div>
  );
}
