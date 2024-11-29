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
  getAllGalleryItems: () => {
    const accessToken = getAccessToken();
    return api.get('/client/gallery', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createGalleryItem: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/gallery', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateGalleryItem: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/gallery/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteGalleryItem: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    photo: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllGalleryItems();
      setGalleryItems(response.data);
    } catch (error) {
      setError('Failed to fetch gallery items');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch gallery items',
        placement: 'topRight',
      });
      console.error('Error fetching gallery items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      setFormData(prev => ({
        ...prev,
        photo: files[0]
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

  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      if (formData.photo) {
        formDataToSend.append('image', formData.photo);
      }

      await apiRequests.createGalleryItem(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Gallery item added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchGalleryItems();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add gallery item',
        placement: 'topRight',
      });
      setError('Failed to add gallery item');
      console.error('Error adding gallery item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditGalleryItem = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }

      await apiRequests.updateGalleryItem(selectedItem._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Gallery item updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchGalleryItems();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update gallery item',
        placement: 'topRight',
      });
      setError('Failed to update gallery item');
      console.error('Error updating gallery item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGalleryItem = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteGalleryItem(selectedItem._id);
      notification.success({
        message: 'Success',
        description: 'Gallery item deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedItem(null);
      fetchGalleryItems();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete gallery item',
        placement: 'topRight',
      });
      setError('Failed to delete gallery item');
      console.error('Error deleting gallery item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      photo: null
    });
    setPreviewUrl('');
    setSelectedItem(null);
  };

  if (isLoading && !galleryItems.length) {
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
        GALLERY
      </motion.h1>
      
 
 
      <div className="mb-6">
        <AddButton title="PHOTO" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={item.photo}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.subtitle}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setFormData({
                    title: item.title,
                    subtitle: item.subtitle,
                    photo: null
                  });
                  setPreviewUrl(item.photo);
                  setIsEditOpen(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setIsDeleteOpen(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
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
                {isAddOpen ? 'Add New Photo' : 'Edit Photo'}
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
            <form onSubmit={isAddOpen ? handleAddGalleryItem : handleEditGalleryItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
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
                      name="photo"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="hidden"
                      id="photo-upload"
                      required={isAddOpen}
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-center w-full p-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      <span>{formData.photo ? 'Change Photo' : 'Upload Photo'}</span>
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
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Photo' : 'Update Photo')}
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
              Are you sure you want to delete "{selectedItem?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedItem(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGalleryItem}
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

export default GallerySection;

