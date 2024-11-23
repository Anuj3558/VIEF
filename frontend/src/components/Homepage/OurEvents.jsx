import React from "react";
import { motion } from "framer-motion";
import { Event1, Event2, Event3, Rectangle23, Rectangle27, Rectangle27_1 } from "../../Assets/images";

const EventsSection = () => {
  const events = [
    {
      title: "How To Build A Startup",
      date: "5 April 2023",
      isOnline: true,
      description:
        "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects.",
      image: Event1,
    },
    {
      title: "Case Study Of Zomato",
      date: "20 April 2023",
      isOnline: true,
      description:
        "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
      image: Event2,
    },
    {
      title: "Award 2023-24",
      date: "19 April 2023",
      isOnline: true,
      description:
        "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
      image: Event3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto   px-3 md:px-20 py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Our Events
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {events.map((event, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="relative group"
          >
            <div className="rounded-[2rem] border-2 border-gray-200 overflow-hidden bg-white">
              <div className="relative rounded-[2rem] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={event.image}
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

              <div className="p-4 ">
                <div className="flex px-7 gap-4 border border-dashed border-gray-500 rounded-2xl p-2 mb-4">
                  <h3 className="text-[#1a237e] items-start flex text-center py-3 text-[16px] barlow-condensed-regular font-semibold flex-1">
                    {event.title}
                  </h3>
                  <div className="flex flex-col items-end gap-1 barlow-condensed-regular">
                    <span className="text-sm text-gray-600">{event.date}</span>
                    {event.isOnline && (
                      <span className="text-[#00C944] text-sm">Online</span>
                    )}
                  </div>
                </div>

                <div className="bg-[#FF4A11] text-white rounded-[1rem] p-4 ">
                  <p className="text-sm leading-relaxed">{event.description}</p>
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
          className="text-xl underline font-medium hover:text-[#FF4D00] transition-colors"
        >
          More
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EventsSection;