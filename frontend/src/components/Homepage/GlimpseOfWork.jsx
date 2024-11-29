'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function WorkGlimpse() {
  const [hoveredVideo, setHoveredVideo] = useState(null);

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

  // YouTube video IDs 
  const videoIds = [
    'dQw4w9WgXcQ',
    'aqz-KE-bpKQ',
    
  ];

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
        Changing visions through missions.
      </motion.h2>
      
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {videoIds.map((videoId, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className={`col-span-1 ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            onMouseEnter={() => setHoveredVideo(index)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <div className="w-full h-full rounded-xl overflow-hidden aspect-video relative group">
              {/* Custom hover overlay */}
              {hoveredVideo !== index && (
                <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
                  <span className="text-white text-opacity-80 text-lg">
                   
                  </span>
                </div>
              )}

              {/* YouTube Embed with custom parameters to remove controls */}
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${hoveredVideo === index ? 1 : 0}&mute=1&controls=0&showinfo=0&rel=0`}
                title={`YouTube video player ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}