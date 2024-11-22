import React from "react";
import { motion } from "framer-motion";
import VideoThumbnail from "./video-thumbnail.jsx";
import { bgTexture, Rectangle23, Rectangle24, Rectangle25, Rectangle26 } from "../../Assets/images/index.js";

export default function WorkGlimpse() {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
   
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="md:w-[1470px] mt-10 px-4 md:px-48 h-[75vh] flex flex-col justify-center"
    >
      <motion.h2 
        variants={itemVariants}
        className="mb-4 text-center text-2xl font-bold tracking-tighter md:text-4xl"
      >
        Glimpse of our work
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        className="flex flex-col mt-5 gap-10 md:flex-row h-[calc(70vh-4rem)]"
      >
        <motion.div 
          variants={itemVariants} 
          whileHover="hover"
          className="md:w-[85%]"
        >
          <VideoThumbnail
            src={Rectangle23}
            alt="Office workspace with computers and hanging lights"
            className="md:h-[595px] w-full rounded-xl"
          />
        </motion.div>
        <motion.div 
          variants={containerVariants}
          className="flex flex-col gap-10 md:w-[35%]"
        >
          {[Rectangle24, Rectangle25, Rectangle26].map((img, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover="hover"
            >
              <VideoThumbnail
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="aspect-[16/9] rounded-xl"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>

  );
}