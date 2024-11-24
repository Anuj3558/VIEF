import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineArrowRight } from 'react-icons/ai'; // Import the arrow icon

export default function ApplyButton({ text }) {
  return (
    <a href='/apply-now'>
      <motion.button 
        className="bg-[#FF4D00] hover:bg-[#FF4D10]/90 text-white rounded px-5 py-1 flex items-center gap-3 montserrat-main text-lg relative overflow-hidden group"
      >
        <span className="relative z-10 font-medium">{text}</span>
        
        {/* Arrow icon with tilt */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 0.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        <AiOutlineArrowRight 
          className="text-white text-2xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
        />
      </motion.button>
    </a>
  );
}
