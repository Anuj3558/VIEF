"use client";

import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { SchemeContext } from "../contexts/SchemeContext";

export default function ApplyNowPage() {
  const { schemes, loading, error } = useContext(SchemeContext); // Use SchemeContext to access schemes
  const [showAll, setShowAll] = useState(false); // State to toggle visibility of more schemes
  const navigate = useNavigate(); // Use useNavigate to handle navigation

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

  const SchemeSection = ({ schemes }) => (
    <section className="my-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Schemes Available
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {(showAll ? schemes : schemes.slice(0, 6)).map((scheme, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative group"
          >
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative rounded-[2rem] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={scheme.image || "/images/defaultScheme.jpg"} // Default image if not available
                  alt={scheme.title}
                  className="w-full h-[250px] object-cover"
                />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center cursor-pointer group-hover:bg-[#FF4D00] transition-colors duration-300"
                  onClick={() => navigate(`/scheme-details/${scheme._id}`)} // Redirect to scheme details on click
                >
                  <ArrowUpRight className="w-6 h-6 text-[#1a237e] rotate-[-45deg] group-hover:text-white transition-colors duration-300" />
                </motion.div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 border border-dashed border-gray-200 rounded-2xl p-2 mb-4">
                  <h3 className="text-[#1a237e] text-lg font-semibold line-clamp-1">
                    {scheme.title}
                  </h3>
                  <div className="flex flex-col items-end gap-1 ml-auto">
                    <span className="text-sm text-gray-600">{scheme.date}</span>
                    <span className="text-xs text-[#FF4D00]">
                      {scheme.deadline}
                    </span>
                  </div>
                </div>

                <div className="bg-[#1a237e] text-white p-4 rounded-xl">
                  <p className="text-sm leading-relaxed line-clamp-3">
                    {scheme.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl font-medium text-[#1a237e] hover:text-[#FF4D00] transition-colors"
          onClick={() => setShowAll((prev) => !prev)} // Toggle visibility of more schemes
        >
          {showAll ? "Show Less" : "More"} {/* Toggle button text */}
        </motion.button>
      </motion.div>
    </section>
  );

  // Render loading or error message
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <p>Loading schemes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SchemeSection schemes={schemes} />
      </main>
    </div>
  );
}
