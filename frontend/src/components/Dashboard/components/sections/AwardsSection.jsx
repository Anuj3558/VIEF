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
  getAllAwards: () => {
    const accessToken = getAccessToken();
    return api.get('/client/awards', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createAward: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/awards', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateAward: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/awards/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteAward: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/awards/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const AwardsSection = () => {
  const [awards, setAwards] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    recipient: '',
    description: '',
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllAwards();
      setAwards(response.data);
    } catch (error) {
      setError('Failed to fetch awards');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch awards',
        placement: 'topRight',
      });
      console.error('Error fetching awards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAward = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('recipient', formData.recipient);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.createAward(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Award added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add award',
        placement: 'topRight',
      });
      setError('Failed to add award');
      console.error('Error adding award:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAward = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('recipient', formData.recipient);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.updateAward(selectedAward._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Award updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update award',
        placement: 'topRight',
      });
      setError('Failed to update award');
      console.error('Error updating award:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAward = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteAward(selectedAward._id);
      notification.success({
        message: 'Success',
        description: 'Award deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedAward(null);
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete award',
        placement: 'topRight',
      });
      setError('Failed to delete award');
      console.error('Error deleting award:', error);
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
      recipient: '',
      description: '',
      image: null
    });
    setPreviewUrl('');
    setSelectedAward(null);
  };

  if (isLoading && !awards.length) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 max-h-[100vh] ">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        AWARDS
      </motion.h1>

      <div className="my-6">
        <AddButton title="AWARD" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {awards.map((award) => (
          <Card
            key={award._id}
            image={award.image}
            title={award.title}
            subtitle={`Recipient: ${award.recipient}`}
            description={award.description}
            onEdit={() => {
              setSelectedAward(award);
              setFormData({
                title: award.title,
                recipient: award.recipient,
                description: award.description,
                image: null
              });
              setPreviewUrl(award.image);
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedAward(award);
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
                {isAddOpen ? 'Add New Award' : 'Edit Award'}
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
            <form onSubmit={isAddOpen ? handleAddAward : handleEditAward} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Award Title</label>
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
                <label className="block text-sm font-medium mb-1">Recipient</label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
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
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Award' : 'Update Award')}
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
              Are you sure you want to delete "{selectedAward?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedAward(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAward}
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

export default AwardsSection;