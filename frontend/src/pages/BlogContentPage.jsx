import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import { motion } from "framer-motion"; // Import motion if not already imported
import { ArrowLeft } from "react-feather"; // Import the arrow icon (ensure you have the correct package)

const BlogContentPage = ({ onBack }) => {
  const { id } = useParams(); // Get the id from the URL params
  const { blogPosts } = useContext(BlogContext); // Get blogPosts from context

  // Find the post by id
  const post = blogPosts.find((post) => post._id === id);

  // If the post is not found, you can show a loading or not found message
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
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
      className="container mx-auto px-4 py-12"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 flex items-center text-[#FF4D00] hover:text-[#FF3D00] transition-colors duration-300"
      >
        <ArrowLeft className="mr-2" />
        Back to Blog
      </motion.button>

      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl mb-4 text-gray-800"
      >
        {post.title}
      </motion.h1>

      {/* Author and Date */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 text-gray-600"
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
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Blog Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </motion.div>
  );
};

export default BlogContentPage;
