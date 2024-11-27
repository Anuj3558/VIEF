import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit2, Trash2, X, Upload } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';
import AddButton from '../components/AddButton';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getAccessToken = () => {
  return Cookies.get('authToken');
};

const apiRequests = {
  getAllNews: () => {
    const accessToken = getAccessToken();
    return api.get('/client/newsletter', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createNews: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/news', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateNews: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/news/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteNews: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/news/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    publishDate: '',
    content: '',
    image: null,
    type: 'news'
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllNews();
      setNews(response.data);
    } catch (error) {
      setError('Failed to fetch news');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch news',
        placement: 'topRight',
      });
      console.error('Error fetching news:', error);
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

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('publishDate', formData.publishDate);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('type', formData.type);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.createNews(formDataToSend);
      notification.success({
        message: 'Success',
        description: `${formData.type === 'news' ? 'News' : 'Article'} added successfully`,
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchNews();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Failed to add ${formData.type === 'news' ? 'news' : 'article'}`,
        placement: 'topRight',
      });
      setError(`Failed to add ${formData.type === 'news' ? 'news' : 'article'}`);
      console.error(`Error adding ${formData.type === 'news' ? 'news' : 'article'}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNews = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('publishDate', formData.publishDate);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('type', selectedNews.type); // Use the existing type
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.updateNews(selectedNews._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: `${selectedNews.type === 'news' ? 'News' : 'Article'} updated successfully`,
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchNews();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Failed to update ${selectedNews.type === 'news' ? 'news' : 'article'}`,
        placement: 'topRight',
      });
      setError(`Failed to update ${selectedNews.type === 'news' ? 'news' : 'article'}`);
      console.error(`Error updating ${selectedNews.type === 'news' ? 'news' : 'article'}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNews = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteNews(selectedNews._id);
      notification.success({
        message: 'Success',
        description: `${selectedNews.type === 'news' ? 'News' : 'Article'} deleted successfully`,
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedNews(null);
      fetchNews();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Failed to delete ${selectedNews.type === 'news' ? 'news' : 'article'}`,
        placement: 'topRight',
      });
      setError(`Failed to delete ${selectedNews.type === 'news' ? 'news' : 'article'}`);
      console.error(`Error deleting ${selectedNews.type === 'news' ? 'news' : 'article'}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      publishDate: '',
      content: '',
      image: null,
      type: 'news'
    });
    setPreviewUrl('');
    setSelectedNews(null);
  };

  if (isLoading && !news.length) {
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
        NEWS & ARTICLES
      </motion.h1>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search news and articles..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => console.log('Search:', e.target.value)}
        />
      </div>

      <div className="mb-6">
        <AddButton title="NEWS/ARTICLE" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2">Published: {new Date(item.publishDate).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-2">{item.description.substring(0, 100)}...</p>
            <p className="text-blue-600 text-sm mb-4">{item.Type === 'news' ? 'News' : 'Article'}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedNews(item);
                    setFormData({
                      title: item.title,
                      publishDate: item.publishDate.split('T')[0],
                      content: item.content,
                      image: null,
                      type: item.type
                    });
                    setPreviewUrl(item.image);
                    setIsEditOpen(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    setSelectedNews(item);
                    setIsDeleteOpen(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Add/Edit Form Modal */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isAddOpen ? 'Add New News/Article' : 'Edit News/Article'}
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
            <form onSubmit={isAddOpen ? handleAddNews : handleEditNews} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
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
                <label className="block text-sm font-medium mb-1">Publish Date</label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows="5"
                  required
                />
              </div>
              {isAddOpen && (
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="news"
                        checked={formData.type === 'news'}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">News</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="article"
                        checked={formData.type === 'article'}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">Article</span>
                    </label>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Processing...</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  isAddOpen ? 'Add News/Article' : 'Update News/Article'
                )}
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
              Are you sure you want to delete "{selectedNews?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedNews(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteNews}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Deleting...</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;

