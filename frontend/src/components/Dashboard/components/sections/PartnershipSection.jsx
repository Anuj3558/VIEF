import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';

import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getAccessToken = () => {
  return Cookies.get('authToken');
};

const apiRequests = {
  getAllPartnerships: () => {
    const accessToken = getAccessToken();
    return api.get('/client/partnerships', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createPartnership: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/partnerships', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updatePartnership: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/partnerships/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deletePartnership: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/partnerships/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const PartnershipSection = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const fetchPartnerships = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllPartnerships();
      setPartnerships(response.data);
    } catch (error) {
      setError('Failed to fetch partnerships');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch partnerships',
        placement: 'topRight',
      });
      console.error('Error fetching partnerships:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPartnership = async (e) => {
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

      await apiRequests.createPartnership(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Partnership added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchPartnerships();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add partnership',
        placement: 'topRight',
      });
      setError('Failed to add partnership');
      console.error('Error adding partnership:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPartnership = async (e) => {
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

      await apiRequests.updatePartnership(selectedPartnership._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Partnership updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchPartnerships();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update partnership',
        placement: 'topRight',
      });
      setError('Failed to update partnership');
      console.error('Error updating partnership:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePartnership = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deletePartnership(selectedPartnership._id);
      notification.success({
        message: 'Success',
        description: 'Partnership deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedPartnership(null);
      fetchPartnerships();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete partnership',
        placement: 'topRight',
      });
      setError('Failed to delete partnership');
      console.error('Error deleting partnership:', error);
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

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: null
    });
    setPreviewUrl('');
    setSelectedPartnership(null);
  };

  if (isLoading && !partnerships.length) {
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
        PARTNERSHIPS
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      
      <div className="my-6">
        <AddButton title="PARTNERSHIP" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partnerships.map((partnership) => (
          <Card
            key={partnership._id}
            image={partnership.image}
            title={partnership.title}
            subtitle={partnership.subtitle}
            description={partnership.description}
            onEdit={() => {
              setSelectedPartnership(partnership);
              setFormData({
                title: partnership.title,
                subtitle: partnership.subtitle,
                description: partnership.description,
                image: null
              });
              setPreviewUrl(partnership.image);
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedPartnership(partnership);
              setIsDeleteOpen(true);
            }}
          />
        ))}
      </motion.div>

      {/* Add/Edit Form Modal */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isAddOpen ? 'Add New Partnership' : 'Edit Partnership'}
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
            <form onSubmit={isAddOpen ? handleAddPartnership : handleEditPartnership} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Partnership Title</label>
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
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Partnership' : 'Update Partnership')}
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
              Are you sure you want to delete "{selectedPartnership?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedPartnership(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePartnership}
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

export default PartnershipSection;
