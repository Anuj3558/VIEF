import React from "react";
import { motion } from "framer-motion";
import { bgTexture, COCA, MC } from "../../Assets/images";
import ApplyButton from "./compoents/ApplyButton";

function StoriesSection() {
  const stories = [
    {
      title: "MC DONALDS",
      subtitle: "Expanding exponentially",
      image: MC,
    },
    {
      title: "COCA - COLA",
      subtitle: "Expanding exponentially",
      image: COCA,
    },
    {
      title: "NEW STORY",
      subtitle: "Inspiring growth",
      image: COCA, // Using bgTexture as a placeholder for the third image
    },
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left Section */}
        <motion.div 
          className="lg:w-1/3 flex flex-col justify-start items-start"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center lg:text-left">
            <span className="text-[#FF4D00]">Stories to</span>
            <br />
            <span className="text-[#1a237e]">Inspire You</span>
          </h2>
          <div className="w-full sm:w-auto mb-6">
            <ApplyButton text={"Explore"} route={"/sucess-story"} />
          </div>
          
          {/* New image below Apply button */}
          <motion.div
            className="w-full mt-6"
            variants={itemVariants}
          >
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={stories[2].image}
                alt={stories[2].title}
                className="w-full h-[200px] sm:h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg font-bold mb-1">{stories[2].title}</h3>
                <p className="text-xs opacity-90">{stories[2].subtitle}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section - Stories Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 gap-6 flex-1"
          variants={containerVariants}
        >
          {stories.slice(0, 2).map((story, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              variants={itemVariants}
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-xs sm:text-sm opacity-90">{story.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default StoriesSection;

