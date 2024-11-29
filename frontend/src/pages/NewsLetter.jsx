import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { motion } from "framer-motion";
import { NewsletterContext } from "../contexts/NewsletterContext";

// Card Component for News or Articles
const NewsCard = ({ item }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    // Navigate to the detail page with the item id
    navigate(`/news-letter/${item._id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-justify mb-2 text-gray-500">
          {item.publishDate}
        </p>
        <h3 className="text-lg font-semibold mb-2 text-justify">
          {item.title}
        </h3>
        
      </div>
    </motion.div>
  );
};

// Main Newsletter Component
const Newsletter = () => {
  const { newsletters } = useContext(NewsletterContext);

  return (
    <div className="container mx-auto px-4 pt-20 py-12 ">
      <h1 className="text-4xl font-bold mb-10">Newsletter</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Trending News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters
            .filter((news) => news.Type === "news")
            .map((news) => (
              <NewsCard key={news._id} item={news} />
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Startup Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters
            .filter((news) => news.Type === "article")
            .map((article) => (
              <NewsCard key={article._id} item={article} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
