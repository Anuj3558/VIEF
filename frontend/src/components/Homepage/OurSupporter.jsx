import React, { useContext } from "react";
import { motion } from "framer-motion";
import { SponsorContext } from "../../contexts/SponsorContext.js";

function SupportersSection() {
  const { supporters, loading, error } = useContext(SponsorContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return <div className="text-center py-12">Loading supporters...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading supporters: {error}
      </div>
    );
  }

  // Get only the top 4 supporters
  const topSupporters = supporters.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-center md:text-left"
          variants={itemVariants}
        >
          <span className="text-[#FF4D00]">Our</span>{" "}
          <span className="text-[#1a237e]">Supporters</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full md:flex md:flex-wrap md:justify-center"
          variants={containerVariants}
        >
          {topSupporters.map((supporter, index) => (
            <motion.div
              key={supporter._id || index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-full sm:w-[200px] h-[120px] flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <img
                src={supporter.image}
                alt={supporter.title}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SupportersSection;
