import React from "react";
import { FaClipboardList, FaSearch, FaUserTie, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaClipboardList className="w-16 h-16 text-white" />,
    title: "Apply to Join VIEF",
    description:
      "Fill out our online application form with your startup details. We review every application thoroughly to ensure a good fit.",
  },
  {
    icon: <FaSearch className="w-16 h-16 text-white" />,
    title: "Screening & Evaluation",
    description:
      "Our team will assess your submission, reviewing the potential and alignment with our incubation program. If selected, expect an invite within 24 hours.",
  },
  {
    icon: <FaUserTie className="w-16 h-16 text-white" />,
    title: "Initial Pitch Meeting",
    description:
      "We'll schedule a call with you to dive deeper into your startup's vision, goals, and challenges, offering guidance and support.",
  },
  {
    icon: <FaUsers className="w-16 h-16 text-white" />,
    title: "Onboarding Into VIEF",
    description:
      "Once approved, you'll officially join the VIEF ecosystem. Gain access to mentorship, resources, and funding opportunities as part of our thriving community.",
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

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const HowToJoinSection = () => {
  return (
    <main className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-transparent py-7">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-black text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              How To Join VIEF
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-black text-center mb-12"
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
                    className="bg-[#ff4911ae] rounded-full p-4 mb-4 w-24 h-24 flex items-center justify-center"
                    variants={iconVariants}
                    aria-hidden="true"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-black mb-2 text-center px-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 text-center px-4">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HowToJoinSection;
