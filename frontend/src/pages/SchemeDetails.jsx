'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Scheme } from "../Assets/images";

const SchemeDetails = () => {
  const { id } = useParams();
  const [schemeDetails, setSchemeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/scheme-details?id=${id}`
        );
        setSchemeDetails(response.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching scheme details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading scheme details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!schemeDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Scheme details not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 w-full flex flex-col bg-white p-4">
      {/* Title */}
      <motion.h1
        className="text-3xl text-left font-bold text-[#1a237e] mb-8 max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {schemeDetails.title}
      </motion.h1>

      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="rounded-2xl overflow-hidden bg-white shadow-md">
          <div className="relative rounded-[2rem] overflow-hidden group">
            {/* Image Section */}
            <motion.div
              className="overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={schemeDetails.image || Scheme}
                alt={schemeDetails.title}
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            {/* Apply Now Button */}
            <div className="absolute bottom-4 right-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="bg-[#FF4D00] hover:bg-[#ff6b33] text-white font-medium px-6 py-2 rounded-xl">
                  Apply Now
                </button>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {/* Scheme Header */}
            <div className="p-4">
              <div className="flex px-7 text-8xl gap-4 border border-dashed border-gray-500 rounded-2xl p-2">
                <h3 className="text-[#1a237e] items-start flex text-center py-3 text-[24px] barlow-condensed-regular font-bold flex-1">
                  {schemeDetails.title}
                </h3>
                <div className="flex flex-col items-end gap-1 text-[20px] barlow-condensed-regular">
                  <span className="text-gray-600">{schemeDetails.date}</span>
                  <span className="text-[#FF4D00]">{schemeDetails.deadline}</span>
                </div>
              </div>
            </div>

            {/* Scheme Description */}
            <div className="text-black p-4 rounded-xl">
              <p className="text-sm leading-relaxed">
                {schemeDetails.description}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SchemeDetails;

