import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NewsletterContext } from "../contexts/NewsletterContext";

const NewsCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news-letter/${item._id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
      whileHover={{ y: -5 }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-40 sm:h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-xs sm:text-sm text-gray-500 mb-2">
          {new Date(item.publishDate).toLocaleDateString()}
        </p>
        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
};

const Newsletter = () => {
  const { newsletters } = useContext(NewsletterContext);

  return (
    <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">Newsletter</h1>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Trending News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {newsletters
            .filter((news) => news.Type === "news")
            .map((news) => (
              <NewsCard key={news._id} item={news} />
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Startup Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

