import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import { motion } from "framer-motion";
import { ArrowLeft } from "react-feather";

const BlogContentPage = ({ onBack }) => {
  const { id } = useParams();
  const { blogPosts } = useContext(BlogContext);

  const post = blogPosts.find((post) => post._id === id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-xl text-gray-800">Blog post not found!</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 flex items-center text-[#FF4D00] hover:text-[#FF3D00] transition-colors duration-300"
      >
        <ArrowLeft className="mr-2" size={20} />
        <span className="text-sm sm:text-base">Back to Blog</span>
      </motion.button>

      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-left text-gray-900"
        >
          {post.title}
        </motion.h1>

        {/* Author and Date */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 text-sm text-gray-600 text-left"
        >
          <span>
            By {post.author} | {post.date}
          </span>
        </motion.div>

        {/* Image */}
        <motion.img
          src={post.image}
          alt={post.title}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-2"
        />

        {/* Blog Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 text-left"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </motion.div>
  );
};

export default BlogContentPage;