import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Upload } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';
import ReactQuill from 'react-quill';
import ReactPaginate from 'react-paginate';
import 'react-quill/dist/quill.snow.css';
import AddButton from '../components/AddButton';
import Card from "../components/Card";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getAccessToken = () => {
  return Cookies.get('authToken');
};

const apiRequests = {
  getAllBlogs: (page = 1, limit = 9) => {
    const accessToken = getAccessToken();
    return api.get(`client/blogs?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createBlog: (formData) => {
    const accessToken = getAccessToken();
    return api.post('admin/blogs', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateBlog: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`admin/blogs/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteBlog: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`admin/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
    excerpt: '',
    image: null,
    content: '',
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllBlogs(currentPage + 1, itemsPerPage);
      setBlogs(response.data.blogs || []);
      setPageCount(Math.ceil((response.data.total || 0) / itemsPerPage));
    } catch (error) {
      setError('Failed to fetch blogs');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch blogs',
        placement: 'topRight',
      });
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleQuillChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await apiRequests.createBlog(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Blog post added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add blog post',
        placement: 'topRight',
      });
      setError('Failed to add blog post');
      console.error('Error adding blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBlog = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await apiRequests.updateBlog(selectedBlog.id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Blog post updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update blog post',
        placement: 'topRight',
      });
      setError('Failed to update blog post');
      console.error('Error updating blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteBlog(selectedBlog.id);
      notification.success({
        message: 'Success',
        description: 'Blog post deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedBlog(null);
      fetchBlogs();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete blog post',
        placement: 'topRight',
      });
      setError('Failed to delete blog post');
      console.error('Error deleting blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      date: '',
      excerpt: '',
      image: null,
      content: '',
    });
    setPreviewUrl('');
    setSelectedBlog(null);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading && blogs.length === 0) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        BLOG POSTS
      </motion.h1>

      <div className="mb-6">
        <AddButton title="BLOG POST" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            image={blog.image}
            title={blog.title}
            subtitle={`By ${blog.author} on ${blog.date}`}
            description={blog.excerpt}
            onEdit={() => {
              setSelectedBlog(blog);
              setFormData({
                title: blog.title,
                author: blog.author,
                date: blog.date,
                excerpt: blog.excerpt,
                image: null,
                content: blog.content,
              });
              setPreviewUrl(blog.image);
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedBlog(blog);
              setIsDeleteOpen(true);
            }}
          />
        ))}
      </motion.div>

      {blogs.length > 0 && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex justify-center mt-8 space-x-2'}
          pageClassName={'px-3 py-2 rounded-lg border hover:bg-gray-100'}
          pageLinkClassName={'text-blue-500'}
          previousClassName={'px-3 py-2 rounded-lg border hover:bg-gray-100'}
          previousLinkClassName={'text-blue-500'}
          nextClassName={'px-3 py-2 rounded-lg border hover:bg-gray-100'}
          nextLinkClassName={'text-blue-500'}
          breakClassName={'px-3 py-2'}
          breakLinkClassName={'text-blue-500'}
          activeClassName={'bg-blue-500 text-white'}
        />
      )}

      {/* Add/Edit Form Modal */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isAddOpen ? 'Add New Blog Post' : 'Edit Blog Post'}
              </h2>
              <button
                onClick={() => {
                  isAddOpen ? setIsAddOpen(false) : setIsEditOpen(false);
                  resetForm();
                }}
                className="p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={isAddOpen ? handleAddBlog : handleEditBlog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Blog Image</label>
                <div className="space-y-2">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      required={isAddOpen}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full p-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      <span>{formData.image ? 'Change Image' : 'Upload Image'}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <ReactQuill
                  value={formData.content}
                  onChange={handleQuillChange}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                  formats={[
                    'header',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image'
                  ]}
                  className="h-64 mb-4"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Blog Post' : 'Update Blog Post')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg p-6 w-full max-w-md">
    <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
    <p className="mb-6">
      Are you sure you want to remove "{selectedBlog?.title}" from the blog posts? This action cannot be undone.
    </p>
    <div className="flex justify-end gap-4">
      <button
        onClick={() => {
          setIsDeleteOpen(false);
          setSelectedBlog(null);
        }}
        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        onClick={handleDeleteBlog}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300"
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  </div>
</div>
      )}
    </div>
  );
};

export default BlogSection;

