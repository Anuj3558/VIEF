import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Sample Trending News and Startup Articles
const trendingNews = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXOT1pLu4feRBB5cHKZ_g6SjcU9902xCxjQ&s",
    date: "June 04, 2023",
    title: "6-Year-Old Horse Dies at Belmont Park After Race Injury",
    description: "A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's...",
    content: "Full article content about the horse race injury and the implications for the sport...",
  },
  // Additional items...
];

const startupArticles = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXOT1pLu4feRBB5cHKZ_g6SjcU9902xCxjQ&s",
    category: "Basketball",
    title: "5 Exercises Basketball Players Should Be Using To Develop Strength",
    description: "Strength in basketball isn't all about a massive body mass or appeal muscles...",
    author: { name: "Jake Will", avatar: "/images/profile-pic-1.jpg" },
    date: "04 June 2023",
    content: "Detailed explanation of exercises and their impact on basketball players' performance...",
  },
  // Additional items...
];

// Card Component for News or Articles
const NewsCard = ({ item, onClick }) => (
  <motion.div
    onClick={() => onClick(item)}
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
  >
    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <p className="text-sm text-justify mb-2 text-gray-500">{item.date}</p>
      <h3 className="text-lg font-semibold mb-2 text-justify">{item.title}</h3>
      <p className="text-gray-600 text-justify text-sm">{item.description}</p>
    </div>
  </motion.div>
);

// Detail Page Component
const DetailPage = ({ item, onBack }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto px-4 py-12"
  >
    <button
      onClick={onBack}
      className="mb-6 flex items-center text-[#FF4D00] hover:text-[#FF3D00] transition-colors duration-300"
    >
      <ArrowLeft className="mr-2" />
      Back to Newsletter
    </button>
    <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
    <p className="text-sm text-gray-500 mb-4">
      {item.date} | {item.author?.name}
    </p>
    <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-6" />
    <p className="text-gray-700">{item.content}</p>
  </motion.div>
);

// Main Newsletter Component
const Newsletter = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  if (selectedItem) {
    return <DetailPage item={selectedItem} onBack={() => setSelectedItem(null)} />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Newsletter</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Trending News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingNews.map((news) => (
            <NewsCard key={news.id} item={news} onClick={setSelectedItem} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Startup Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startupArticles.map((article) => (
            <NewsCard key={article.id} item={article} onClick={setSelectedItem} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
