import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit2, Trash2, X, Upload, Calendar } from 'lucide-react';
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
  getAllSchemes: () => {
    const accessToken = getAccessToken();
    return api.get('/client/scheme', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createScheme: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/schemes', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateScheme: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/schemes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteScheme: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/schemes/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const SchemeSection = () => {
  const [schemes, setSchemes] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    applyButtonLink: '',
    deadline: '',
    description: '',
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllSchemes();
      setSchemes(response.data);
    } catch (error) {
      setError('Failed to fetch schemes');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch schemes',
        placement: 'topRight',
      });
      console.error('Error fetching schemes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target;
      if (fileInput.files && fileInput.files[0]) {
        setFormData(prev => ({
          ...prev,
          image: fileInput.files[0]
        }));
        const url = URL.createObjectURL(fileInput.files[0]);
        setPreviewUrl(url);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      notification.error({
        message: 'Error',
        description: 'Please upload an image for the scheme.',
        placement: 'topRight',
      });
      return;
    }
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('applyButtonLink', formData.applyButtonLink);
      formDataToSend.append('deadline', formData.deadline);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.createScheme(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Scheme added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchSchemes();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add scheme',
        placement: 'topRight',
      });
      setError('Failed to add scheme');
      console.error('Error adding scheme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditScheme = async (e) => {
    e.preventDefault();
    if (!selectedScheme) return;
    if (!formData.image && !previewUrl) {
      notification.error({
        message: 'Error',
        description: 'Please upload an image for the scheme.',
        placement: 'topRight',
      });
      return;
    }
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('applyButtonLink', formData.applyButtonLink);
      formDataToSend.append('deadline', formData.deadline);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.updateScheme(selectedScheme._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Scheme updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchSchemes();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update scheme',
        placement: 'topRight',
      });
      setError('Failed to update scheme');
      console.error('Error updating scheme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteScheme = async () => {
    if (!selectedScheme) return;
    try {
      setIsLoading(true);
      await apiRequests.deleteScheme(selectedScheme._id);
      notification.success({
        message: 'Success',
        description: 'Scheme deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedScheme(null);
      fetchSchemes();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete scheme',
        placement: 'topRight',
      });
      setError('Failed to delete scheme');
      console.error('Error deleting scheme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: null,
      applyButtonLink: '',
      deadline: '',
      description: '',
    });
    setPreviewUrl('');
    setSelectedScheme(null);
  };

  if (isLoading && !schemes.length) {
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
        SCHEMES
      </motion.h1>
      
    \

      <div className="mb-6">
        <AddButton title="SCHEME" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schemes.map((scheme) => (
          <div key={scheme._id} className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={scheme.image}
              alt={scheme.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{scheme.title}</h3>
            <p className="text-gray-600 text-sm mb-2">
              <Calendar className="inline-block mr-2" />
              Deadline: {new Date(scheme.deadline).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">{scheme.description}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setSelectedScheme(scheme);
                  setFormData({
                    title: scheme.title,
                    image: null,
                    applyButtonLink: scheme.applyButtonLink,
                    deadline: new Date(scheme.deadline).toISOString().split('T')[0],
                    description: scheme.description,
                  });
                  setPreviewUrl(scheme.image);
                  setIsEditOpen(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  setSelectedScheme(scheme);
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
                {isAddOpen ? 'Add New Scheme' : 'Edit Scheme'}
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
            <form onSubmit={isAddOpen ? handleAddScheme : handleEditScheme} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image <span className="text-red-500">*</span>
                </label>
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
                      required
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
                <label className="block text-sm font-medium mb-1">Apply Button Link</label>
                <input
                  type="url"
                  name="applyButtonLink"
                  value={formData.applyButtonLink}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Scheme' : 'Update Scheme')}
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
              Are you sure you want to delete "{selectedScheme?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedScheme(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteScheme}
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

export default SchemeSection;

