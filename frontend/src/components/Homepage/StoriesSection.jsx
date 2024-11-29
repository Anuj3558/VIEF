import React, { useContext } from "react";
import { motion } from "framer-motion";
import { bgTexture, COCA, MC } from "../../Assets/images";
import ApplyButton from "./compoents/ApplyButton";
import { NewsletterContext } from "../../contexts/NewsletterContext";
import { Link } from "react-router-dom";
function StoriesSection() {
  const { newsletters } = useContext(NewsletterContext);

  // Filter newsletters to only include those with Type = "Article"
  const filteredNewsletters = newsletters?.filter(
    (newsletter) => newsletter.Type == "article"
  );

  // Placeholder content until newsletters are fetched or no matching articles
  if (!filteredNewsletters || filteredNewsletters.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">No articles available.</p>
      </div>
    );
  }

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
      className="max-w-6xl mx-auto mt-24 sm:p-6 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Left Section */}
        <motion.div
          className="w-full  lg:w-1/3 flex flex-col justify-start items-center lg:items-start"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center lg:text-left">
            <span className="text-[#FF4D00]">Stories to</span>
            <br />
            <span className="text-[#1a237e]">Inspire You</span>
          </h2>
          <div className="w-full flex justify-center lg:justify-start mb-6">
            <ApplyButton text={"Explore"} route={"/news-letter"} />
          </div>
            {/* Corrected Link component */}

          {/* Featured Article */}
          <motion.div className="w-full mt-6" variants={itemVariants}>
          <Link to={`/news-letter/${newsletters[0]._id}`}>
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={filteredNewsletters[0].image}
                alt={filteredNewsletters[0].title}
                className="w-full h-[250px] sm:h-[300px] lg:h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg font-bold mb-1">{filteredNewsletters[0].title}</h3>
                <p className="text-xs opacity-90">{filteredNewsletters[0].subtitle}</p>
              </div>
            </div>
            </Link>
          </motion.div>
          
        </motion.div>

        {/* Right Section - Stories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 w-full"
          variants={containerVariants}
        >
          {filteredNewsletters.slice(1,3).map((story, index) => (
            <Link to={`/news-letter/${story._id}`} key={story._id}> {/* Corrected Link component */}
            <motion.div
              className="relative rounded-2xl overflow-hidden group cursor-pointer mx-auto w-full max-w-sm lg:max-w-none"
              variants={itemVariants}
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-90">
                  {story.subtitle}
                </p>
              </div>
            </motion.div>
          </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default StoriesSection;
