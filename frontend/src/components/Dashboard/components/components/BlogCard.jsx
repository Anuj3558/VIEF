import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Edit2, Trash, Trash2 } from 'lucide-react';



const BlogCard= ({ blog, onEdit, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-4">{blog.excerpt}</p>
        <div className="mb-4 h-24 overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-sm text-gray-600" />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={onRemove}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;

