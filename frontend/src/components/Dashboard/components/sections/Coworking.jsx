import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';

import AddButton from '../components/AddButton';
import CoworkingSpaceCard from '../components/CoworkingSpaceCardProps';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getAccessToken = () => {
  return Cookies.get('authToken');
};

const apiRequests = {
  getAllCoworkingSpaces: () => {
    const accessToken = getAccessToken();
    return api.get('/client/coworking-spaces', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createCoworkingSpace: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/coworking-spaces', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateCoworkingSpace: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/coworking-spaces/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteCoworkingSpace: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/coworking-spaces/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const CoworkingSection = () => {
  const [coworkingSpaces, setCoworkingSpaces] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    amenities: [],
    image: null,
    mapLink: '',
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchCoworkingSpaces();
  }, []);

  const fetchCoworkingSpaces = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllCoworkingSpaces();
      setCoworkingSpaces(response.data);
      console.log(response.data)
    } catch (error) {
      setError('Failed to fetch coworking spaces');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch coworking spaces',
        placement: 'topRight',
      });
      console.error('Error fetching coworking spaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCoworkingSpace = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (key === 'amenities') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await apiRequests.createCoworkingSpace(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Coworking space added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchCoworkingSpaces();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add coworking space',
        placement: 'topRight',
      });
      setError('Failed to add coworking space');
      console.error('Error adding coworking space:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCoworkingSpace = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (key === 'amenities') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await apiRequests.updateCoworkingSpace(selectedSpace._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Coworking space updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchCoworkingSpaces();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update coworking space',
        placement: 'topRight',
      });
      setError('Failed to update coworking space');
      console.error('Error updating coworking space:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCoworkingSpace = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteCoworkingSpace(selectedSpace._id);
      notification.success({
        message: 'Success',
        description: 'Coworking space deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedSpace(null);
      fetchCoworkingSpaces();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete coworking space',
        placement: 'topRight',
      });
      setError('Failed to delete coworking space');
      console.error('Error deleting coworking space:', error);
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
    } else if (name === 'amenities') {
      setFormData(prev => ({
        ...prev,
        amenities: value.split(',').map(item => item.trim())
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      description: '',
      amenities: [],
      image: null,
      mapLink: '',
    });
    setPreviewUrl('');
    setSelectedSpace(null);
  };

  if (isLoading && !coworkingSpaces.length) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 max-h-[100vh] overflow-y-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        COWORKING SPACES
      </motion.h1>

      <div className="my-6">
        <AddButton title="COWORKING SPACE" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coworkingSpaces.map((space) => (
          <CoworkingSpaceCard
            key={space._id}
            space={space}
            onEdit={() => {
              setSelectedSpace(space);
              setFormData({
                name: space.name,
                address: space.address,
                description: space.description,
                amenities: space.amenities,
                image: null,
                mapLink: space.mapLink,
              });
              setPreviewUrl(space.image);
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedSpace(space);
              setIsDeleteOpen(true);
            }}
          />
        ))}
      </motion.div>

      {/* Add/Edit Form Modal */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isAddOpen ? 'Add New Coworking Space' : 'Edit Coworking Space'}
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
            <form onSubmit={isAddOpen ? handleAddCoworkingSpace : handleEditCoworkingSpace} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
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
                <label className="block text-sm font-medium mb-1">Amenities (comma-separated)</label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities.join(', ')}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g. WiFi, Coffee, Meeting Rooms"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Map Link</label>
                <input
                  type="url"
                  name="mapLink"
                  value={formData.mapLink}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="space-y-2">
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg"
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Coworking Space' : 'Update Coworking Space')}
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
              Are you sure you want to delete "{selectedSpace?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedSpace(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCoworkingSpace}
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

export default CoworkingSection;

