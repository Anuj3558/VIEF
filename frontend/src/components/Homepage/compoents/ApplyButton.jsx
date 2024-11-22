import React from 'react'
import { motion } from 'framer-motion'

export default function ApplyButton() {
  return (
    <motion.button 
      className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white rounded-full px-5 py-3 flex items-center gap-3 montserrat-main text-lg relative overflow-hidden group"
 
    >
      <span className="relative z-10">Apply Now</span>
      <motion.div 
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 0.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.span 
        className="bg-white rounded-full ml-2 p-3 flex items-center justify-center"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ rotate: 45 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#1a237e" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7"/>
          <path d="M7 7h10v10"/>
        </svg>
      </motion.span>
    </motion.button>
  )
}

