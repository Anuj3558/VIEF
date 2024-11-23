import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact, wc1 } from '../Assets/images';

const images = [contact, wc1]; // Add your carousel images here

const PastEventDetailsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-48 w-full flex flex-col bg-white p-4">
      {/* Title */}
      <motion.h1 
        className="text-3xl text-left font-bold text-[#1a237e] mb-8 max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Past Event Details
      </motion.h1>

      <motion.div 
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
          <div className="relative rounded-[2rem] overflow-hidden group">
            {/* Image Carousel Section */}
            <div className="overflow-hidden relative h-[400px] w-full">
              <AnimatePresence>
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`Event background ${currentImageIndex + 1}`}
                  className="absolute w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Carousel Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Register Button */}
            <div className="absolute bottom-4 right-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  className="bg-[#FF4D00] hover:bg-[#ff6b33] text-white font-medium px-6 py-2 rounded-xl"
                >
                  Register Now
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
            {/* Event Header */}
            <div className="flex items-center gap-4 border border-dashed border-gray-200 rounded-2xl p-4 mb-4">
              <h3 className="text-[#1a237e] text-lg font-semibold">
                How To Build A Startup
              </h3>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">
                  13 April 2023
                </span>
                <span className="text-[#00C944] text-sm font-medium">
                  Online
                </span>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-gray-300 text-black p-4 rounded-xl">
              <p className="text-sm leading-relaxed">
                We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre.
                During The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects,
                We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre.
                During The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects,
                We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre.
                During The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PastEventDetailsPage;