import React from 'react';
import { motion } from 'framer-motion';
import { contact } from '../Assets/images';


const EventDetailsPage = () => {
  return (
    <div className="min-h-screen py-48 w-full flex flex-col bg-white p-4">
      {/* Title */}
      <motion.h1 
        className="text-3xl text-left font-bold text-[#1a237e] mb-8 max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        How To Build A Startup
      </motion.h1>

      <motion.div 
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
          <div className="relative rounded-[2rem] overflow-hidden group">
            {/* Image Section */}
            <motion.div 
              className="overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={contact}
                alt="Event background"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

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
            <div className="bg-gray-300 text-white p-4 rounded-xl">
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

export default EventDetailsPage;    