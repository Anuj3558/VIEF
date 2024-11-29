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

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllSponsors();
      setSponsors(response.data);
    } catch (error) {
      setError('Failed to fetch sponsors');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch sponsors',
        placement: 'topRight',
      });
      console.error('Error fetching sponsors:', error);
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

  const handleAddSponsor = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.createSponsor(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Sponsor added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchSponsors();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add sponsor',
        placement: 'topRight',
      });
      setError('Failed to add sponsor');
      console.error('Error adding sponsor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSponsor = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.updateSponsor(selectedSponsor._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Sponsor updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchSponsors();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update sponsor',
        placement: 'topRight',
      });
      setError('Failed to update sponsor');
      console.error('Error updating sponsor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSponsor = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteSponsor(selectedSponsor._id);
      notification.success({
        message: 'Success',
        description: 'Sponsor deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedSponsor(null);
      fetchSponsors();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete sponsor',
        placement: 'topRight',
      });
      setError('Failed to delete sponsor');
      console.error('Error deleting sponsor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: null
    });
    setPreviewUrl('');
    setSelectedSponsor(null);
  };

  if (isLoading && !sponsors.length) {
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
        SPONSORS
      </motion.h1>
      
 
 

      <div className="mb-6">
        <AddButton title="SPONSOR" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map((sponsor) => (
          <div key={sponsor._id} className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={sponsor.image}
              alt={sponsor.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{sponsor.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{sponsor.subtitle}</p>
            <p className="text-gray-700 mb-4">{sponsor.description}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedSponsor(sponsor);
                  setFormData({
                    title: sponsor.title,
                    subtitle: sponsor.subtitle,
                    description: sponsor.description,
                    image: null
                  });
                  setPreviewUrl(sponsor.image);
                  setIsEditOpen(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  setSelectedSponsor(sponsor);
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
                {isAddOpen ? 'Add New Sponsor' : 'Edit Sponsor'}
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
            <form onSubmit={isAddOpen ? handleAddSponsor : handleEditSponsor} className="space-y-4">
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Sponsor' : 'Update Sponsor')}
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
              Are you sure you want to delete "{selectedSponsor?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedSponsor(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSponsor}
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

export default SponsorsSection;

