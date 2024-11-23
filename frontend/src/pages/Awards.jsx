import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaUniversity, FaChevronRight, FaAward } from 'react-icons/fa';

const Awards = () => {
  const awards = [
    {
      id: 1,
      title: 'Best Incubation Award',
      description: "It's time to shine a spotlight on innovation and entrepreneurship! Join us at IITD-IC as we present an exhilarating Investors Meet, where the brightest minds collide. Don't just spectate, participate! If you are a startup who has developed the product and looking for scaling up your venture with backup from VCs, do submit your application.",
    },
    {
      id: 2,
      title: 'Innovation Excellence Award',
      description: "Recognizing groundbreaking ideas and their impactful execution, this award celebrates startups that have demonstrated exceptional innovation in their field. From cutting-edge technology to novel business models, these ventures are reshaping industries and setting new standards for creativity and problem-solving.",
    },
    {
      id: 3,
      title: 'Sustainable Growth Award',
      description: "This award honors startups that have shown remarkable growth while maintaining a strong focus on sustainability. These companies not only excel in their business metrics but also contribute positively to environmental and social causes, proving that profit and purpose can go hand in hand in the modern business landscape.",
    }
  ];

  const universities = [
    { id: 1, name: 'XYZ University' },
    { id: 2, name: 'ABC Institute of Technology' },
    { id: 3, name: 'PQR College of Engineering' },
    { id: 4, name: 'LMN Business School' },
    { id: 5, name: 'EFG University' },
    { id: 6, name: 'RST Institute of Science' },
    { id: 7, name: 'UVW College' },
    { id: 8, name: 'HIJ Technical University' },
    { id: 9, name: 'OPQ Management Institute' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-400 mb-12">
        <div className="absolute top-0 right-0 w-full h-full">
          <motion.div 
            className="w-full h-full flex justify-end items-start p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <FaAward className="text-white text-6xl" />
          </motion.div>
        </div>
        <motion.h1 
          className="absolute bottom-8 left-8 text-4xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Awards
        </motion.h1>
      </div>

      {/* Awards Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {awards.map((award) => (
          <motion.div 
            key={award.id}
            className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            variants={itemVariants}
          >
            <div className="w-full md:w-1/3 h-64 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded-lg flex items-center justify-center">
              <FaTrophy className="text-yellow-700 text-6xl" />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">{award.title}</h2>
              <p className="text-gray-600">{award.description}</p>
            </div>
          </motion.div>
        ))}
        <div className="text-center">
          <motion.button 
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More
            <FaChevronRight className="ml-2" />
          </motion.button>
        </div>
      </motion.div>

      {/* Partnership Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Partnership Collaboration
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {universities.map((uni) => (
            <motion.div 
              key={uni.id}
              className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 h-48 shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <FaUniversity className="text-blue-400 text-5xl" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white px-4 py-2">
                <p className="text-sm font-medium">{uni.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <motion.button 
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More
            <FaChevronRight className="ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Awards;

