'use client'

import React from 'react';
import { FaClipboardList, FaSearch, FaUserTie, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <FaClipboardList className="w-16 h-16 text-white" />,
    title: "Join Wishlist",
    description: "Click Apply Now. Fill the form and submit. We read each application at least twice before coming to a decision"
  },
  {
    icon: <FaSearch className="w-16 h-16 text-white" />,
    title: "Application Screening",
    description: "The applications we love will hear back from us. We send out call invites within 24 Hours"
  },
  {
    icon: <FaUserTie className="w-16 h-16 text-white" />,
    title: "Pitch To Us",
    description: "We will connect with you on call [Just to get a better understanding of your startup]"
  },
  {
    icon: <FaUsers className="w-16 h-16 text-white" />,
    title: "Community Onboarding",
    description: "After acceptance We will onboard you in our community"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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
      type: "spring",
      stiffness: 100
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const HowToJoinSection = () => {
  return (
    <section className="bg-transparent py-7 ">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-black text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How To Join
        </motion.h2>
        <motion.p 
          className="text-xl text-black text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A Four Step Process
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-[#ff4911ae] rounded-full p-4 mb-4"
                variants={iconVariants}
                aria-hidden="true"
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 text-center">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowToJoinSection;

