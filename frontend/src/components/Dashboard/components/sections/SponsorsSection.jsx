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
  getAllSponsors: () => {
    const accessToken = getAccessToken();
    return api.get('/client/sponsor', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createSponsor: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/sponsors', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateSponsor: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/sponsors/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteSponsor: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/sponsors/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const PartnershipAndSupportersSection = () => {
  const [partnershipsAndSupporters, setPartnershipsAndSupporters] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPartnershipOrSupporter, setSelectedPartnershipOrSupporter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: null,
    type: 'partnership' // New field for the radio button
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchPartnershipsAndSupporters();
  }, []);

  const fetchPartnershipsAndSupporters = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllSponsors();
      setPartnershipsAndSupporters(response.data);
    } catch (error) {
      setError('Failed to fetch partnerships and supporters');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch partnerships and supporters',
        placement: 'topRight',
      });
      console.error('Error fetching partnerships and supporters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name === 'image' && files && files[0]) {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
    } else if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        type: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddPartnershipOrSupporter = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.createSponsor(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Partnership or Supporter added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchPartnershipsAndSupporters();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add partnership or supporter',
        placement: 'topRight',
      });
      setError('Failed to add partnership or supporter');
      console.error('Error adding partnership or supporter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPartnershipOrSupporter = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.updateSponsor(selectedPartnershipOrSupporter._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Partnership or Supporter updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchPartnershipsAndSupporters();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update partnership or supporter',
        placement: 'topRight',
      });
      setError('Failed to update partnership or supporter');
      console.error('Error updating partnership or supporter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePartnershipOrSupporter = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteSponsor(selectedPartnershipOrSupporter._id);
      notification.success({
        message: 'Success',
        description: 'Partnership or Supporter deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedPartnershipOrSupporter(null);
      fetchPartnershipsAndSupporters();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete partnership or supporter',
        placement: 'topRight',
      });
      setError('Failed to delete partnership or supporter');
      console.error('Error deleting partnership or supporter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: null,
      type: 'partnership'
    });
    setPreviewUrl('');
    setSelectedPartnershipOrSupporter(null);
  };

  if (isLoading && !partnershipsAndSupporters.length) {
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
        PARTNERSHIPS AND SUPPORTERS
      </motion.h1>
      
      <div className="mb-6">
        <AddButton title="PARTNERSHIP OR SUPPORTER" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partnershipsAndSupporters.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.subtitle}</p>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-blue-600 text-sm mb-4">{item.type === 'partnership' ? 'Partnership' : 'Supporter'}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedPartnershipOrSupporter(item);
                  setFormData({
                    title: item.title,
                    subtitle: item.subtitle,
                    description: item.description,
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
                  setSelectedPartnershipOrSupporter(item);
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
                {isAddOpen ? 'Add New Partnership or Supporter' : 'Edit Partnership or Supporter'}
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
            <form onSubmit={isAddOpen ? handleAddPartnershipOrSupporter : handleEditPartnershipOrSupporter} className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="partnership"
                      checked={formData.type === 'partnership'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Partnership
                  </label>
                  <label className="flex items-center"><input
                      type="radio"
                      name="type"
                      value="supporter"
                      checked={formData.type === 'supporter'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Supporter
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Partnership or Supporter' : 'Update Partnership or Supporter')}
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
              Are you sure you want to delete "{selectedPartnershipOrSupporter?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedPartnershipOrSupporter(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePartnershipOrSupporter}
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

export default PartnershipAndSupportersSection;

