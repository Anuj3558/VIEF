'use client'

import React from "react";
import { motion } from "framer-motion";
import VideoThumbnail from "./video-thumbnail";
import { Rectangle23, Rectangle24, Rectangle25, Rectangle26 } from "../../Assets/images";

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
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-16 lg:py-20"
    >
      <motion.h2 
        variants={itemVariants}
        className="mb-14 text-center text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl"
      
      >
        Glimpse of our work
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <motion.div 
          variants={itemVariants} 
          whileHover="hover"
          className="col-span-1 md:col-span-2 lg:col-span-2"
        >
          <VideoThumbnail
            src={Rectangle23}
            alt="Office workspace with computers and hanging lights"
            className="w-full h-full object-cover rounded-xl aspect-video"
          />
        </motion.div>
        {[Rectangle24, Rectangle25, Rectangle26 ,Rectangle23].map((img, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover="hover"
            className="col-span-1"
          >
            <VideoThumbnail
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-xl aspect-video"
            />
            
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

