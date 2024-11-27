import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Technology",
    author: "Jane Doe",
    date: "November 15, 2024",
    excerpt: "Exploring the cutting-edge innovations that are reshaping our world and how they will impact our daily lives in the coming years.",
    image: "https://i.gzn.jp/img/2021/05/07/square-earning-q1-2021/00_m.jpg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 2,
    title: "Sustainable Living Practices",
    author: "John Smith",
    date: "October 22, 2024", 
    excerpt: "Practical tips and strategies for reducing your carbon footprint and creating a more environmentally friendly lifestyle.",
    image: "/api/placeholder/800/400",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  },
  {
    id: 3,
    title: "Mental Health in the Digital Age",
    author: "Emily Chen",
    date: "September 5, 2024",
    excerpt: "An in-depth look at the challenges of maintaining mental wellness in our hyper-connected, always-on digital world.",
    image: "/api/placeholder/800/400",
    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
  },
  {
    id: 4,
    title: "The Art of Productive Learning",
    author: "Michael Rodriguez",
    date: "August 18, 2024",
    excerpt: "Discover proven techniques for effective learning, personal growth, and skill development in today's fast-paced environment.",
    image: "/api/placeholder/800/400",
    content: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
  }
];

// Blog Post Card Component
const BlogPostCard = ({ post, onClick }) => {
  return (
    <motion.div 
      onClick={() => onClick(post)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl h-full"
    >
      <motion.div
        className="relative overflow-hidden"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.5 }
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
          className="flex  justify-between items-center mb-2"
        >
          <span className="text-sm text-gray-500 opacity-70">{post.date}</span>
        </motion.div>
        
        <motion.h3 
          whileHover={{ 
            color: '#FF4D00',
            transition: { duration: 0.3 }
          }}
          className="text-lg text-justify font-bold mb-3 text-gray-800 transition-colors duration-300"
        >
          {post.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-4 line-clamp-3"
        >
          {post.excerpt}
        </motion.p>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-500 opacity-70">By {post.author}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Blog Content Page Component
const BlogContentPage = ({ post, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 flex items-center text-[#FF4D00] hover:text-[#FF3D00] transition-colors duration-300"
      >
        <ArrowLeft className="mr-2" />
        Back to Blog
      </motion.button>
      
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl mb-4 text-gray-800"
      >
        {post.title}
      </motion.h1>
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 text-gray-600"
      >
        <span>By {post.author} | {post.date}</span>
      </motion.div>
      
      <motion.img 
        src={post.image} 
        alt={post.title}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-700 leading-relaxed"
      >
        {post.content}
      </motion.div>
    </motion.div>
  );
};

// Main Blog Page Component
const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  // Filter posts based on search
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return <BlogContentPage post={selectedPost} onBack={handleBackClick} />;
  }

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
              staggerChildren: 0.2
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPosts.map(post => (
          <BlogPostCard key={post.id} post={post} onClick={handlePostClick} />
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
    </motion.div>
  );
};

export default BlogPage;

