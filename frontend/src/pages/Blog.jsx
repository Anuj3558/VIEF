import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { BlogContext } from "../contexts/BlogContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

// Blog Post Card Component
const BlogPostCard = ({ post, onClick }) => {
  const handleShare = (e) => {
    e.stopPropagation();
    const postLink = `${window.location.origin}/post/${post._id}`;

    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        toast.success("Blog post link copied!", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <motion.div
      onClick={() => onClick(post)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl h-full relative"
    >
      <motion.div
        className="relative overflow-hidden"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 },
        }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out"
        />
      </motion.div>

      <div className="p-6 text-justify text-sm flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-2"
        >
          <span className="text-sm text-gray-500 opacity-70">{post.date}</span>
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-[#FF4D00] transition-colors duration-300"
          >
            <Share2 size={20} />
          </motion.button>
        </motion.div>

        <motion.h3
          whileHover={{
            color: "#FF4D00",
            transition: { duration: 0.3 },
          }}
          className="text-lg text-justify font-bold mb-3 text-gray-800 transition-colors duration-300"
        >
          {post.title}
        </motion.h3>

        <div className="flex items-center">
          <span className="text-sm text-gray-500 opacity-70">
            By {post.author}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Main Blog Page Component
const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { blogPosts } = useContext(BlogContext);
  const navigate = useNavigate();

  // Filter posts based on search
  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostClick = (post) => {
    navigate(`/post/${post._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mt-14 mb-10 text-gray-800"
      >
        Our Blog
      </motion.h1>

      {/* Search Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 flex justify-center"
      >
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border-2 border-gray-200 rounded-full 
          focus:outline-none focus:border-[#FF4D00] transition-all duration-300"
        />
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPosts.map((post) => (
          <BlogPostCard key={post._id} post={post} onClick={handlePostClick} />
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-gray-500 mt-12"
        >
          No blog posts found matching your search
        </motion.div>
      )}
      <Toaster position="bottom-right" />
    </motion.div>
  );
};

export default BlogPage;
