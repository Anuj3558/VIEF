import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Upload } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const STATUS_OPTIONS = [
  'Current',
  'Successful',
];

const getAccessToken = () => {
  return Cookies.get('authToken');
};

const apiRequests = {
  getAllStartups: () => {
    const accessToken = getAccessToken();
    return api.get('/client/startups', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createStartup: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/startups', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateStartup: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/startups/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteStartup: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/startups/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const StartupsSection = () => {
  const [startups, setStartups] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
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
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllStartups();
      setStartups(response.data);
    } catch (error) {
      setError('Failed to fetch startups');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch startups',
        placement: 'topRight',
      });
      console.error('Error fetching startups:', error);
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

  const handleAddStartup = async (e) => {
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

      await apiRequests.createStartup(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Startup added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add startup',
        placement: 'topRight',
      });
      setError('Failed to add startup');
      console.error('Error adding startup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStartup = async (e) => {
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

      await apiRequests.updateStartup(selectedStartup._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Startup updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update startup',
        placement: 'topRight',
      });
      setError('Failed to update startup');
      console.error('Error updating startup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStartup = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteStartup(selectedStartup._id);
      notification.success({
        message: 'Success',
        description: 'Startup deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedStartup(null);
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete startup',
        placement: 'topRight',
      });
      setError('Failed to delete startup');
      console.error('Error deleting startup:', error);
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
    setSelectedStartup(null);
  };

  if (isLoading && !startups.length) {
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
        STARTUPS
      </motion.h1>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search startups..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => console.log('Search:', e.target.value)}
        />
      </div>

      <div className="mb-6">
        <AddButton title="STARTUP" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {startups.map((startup) => (
          <Card
            key={startup._id}
            image={startup.image}
            title={startup.title}
            subtitle={startup.subtitle}
            description={startup.description}
            onEdit={() => {
              setSelectedStartup(startup);
              setFormData({
                title: startup.title,
                subtitle: startup.subtitle,
                description: startup.description,
                image: null
              });
              setPreviewUrl(startup.image);
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedStartup(startup);
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
                {isAddOpen ? 'Add New Startup' : 'Edit Startup'}
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
            <form onSubmit={isAddOpen ? handleAddStartup : handleEditStartup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Startup Image</label>
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
                <label className="block text-sm font-medium mb-1">Startup Name</label>
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
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white"
                  required
                >
                  <option value="">Select Status</option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={`Status: ${status}`}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Url to Redierct</label>
                <input
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
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Startup' : 'Update Startup')}
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
              Are you sure you want to remove {selectedStartup?.title} from the startups list? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedStartup(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStartup}
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

export default StartupsSection;