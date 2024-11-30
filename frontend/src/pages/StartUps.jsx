"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { StartupContext } from "../contexts/StartupContext";

const StartupCard = ({ name, image, description }) => {
  const formatUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="w-full max-w-[280px] overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square flex items-center justify-center bg-gray-100">
          <img
            src={image || "/placeholder-image.png"}
            alt={`${name} image`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#1a237e] py-2 px-4">
          <h3 className="text-center text-white font-medium">{name}</h3>
        </div>
        <motion.a
          href={formatUrl(description)}
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
};

const StartupSection = ({ title, startups }) => {
  const [showAll, setShowAll] = React.useState(false);

  const handleShowAll = () => setShowAll(true);

  return (
    <section className="my-6">
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
  const { currentStartups, successfulStartups, loading, error } =
    useContext(StartupContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading startups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

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
