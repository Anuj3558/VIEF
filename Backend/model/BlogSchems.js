import mongoose from 'mongoose';

// Define the Blog schema
const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Export the Blog model
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
