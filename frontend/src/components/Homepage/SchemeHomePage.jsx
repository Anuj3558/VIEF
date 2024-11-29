import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SchemeContext } from "../../contexts/SchemeContext";

export default function SchemeHomePage() {
  const { schemes, loading, error } = useContext(SchemeContext);
  const navigate = useNavigate();

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return empty string if no date

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return "";

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return ""; // Return empty string if any error occurs
    }
  };

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

  if (loading) {
    return (
      <div className=" bg-gray-50/50 flex items-center justify-center">
        <p>Loading schemes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-gray-50/50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50/50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <section className="py-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Featured Schemes
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {schemes.slice(0, 3).map((scheme, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group h-[500px]"
              >
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="relative rounded-[2rem] overflow-hidden h-[250px]">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={scheme.image || "/images/defaultScheme.jpg"}
                      alt={scheme.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center cursor-pointer group-hover:bg-[#FF4D00] transition-colors duration-300"
                      onClick={() => navigate(`/scheme-details/${scheme._id}`)}
                    >
                      <ArrowUpRight className="w-6 h-6 text-[#1a237e] rotate-[-45deg] group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 border border-dashed border-gray-200 rounded-2xl p-2 mb-4">
                      <h3 className="text-[#1a237e] text-lg font-semibold line-clamp-1">
                        {scheme.title}
                      </h3>
                      <div className="flex flex-col items-end gap-1 ml-auto">
                        <span className="text-sm text-gray-600">
                          {formatDate(scheme.date)}
                        </span>
                        <span className="text-xs text-[#FF4D00]">
                          {formatDate(scheme.deadline)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#1a237e] text-white p-4 rounded-xl flex-grow flex items-center">
                      {/* Reduced description with 10 words */}
                      <p className="text-sm leading-relaxed line-clamp-4">
                        {scheme.description.split(" ").slice(0, 10).join(" ")}
                        ...
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
