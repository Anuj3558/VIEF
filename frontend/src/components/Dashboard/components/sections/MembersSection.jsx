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

const POSITION_OPTIONS = [
  'Board Member',
  'Advisor',
  'Panel',
  'Mentor',
  'Investor'
];

const getAccessToken = () => {
  return Cookies.get('authToken');
};

const apiRequests = {
  getAllMembers: () => {
    const accessToken = getAccessToken();
    return api.get('/client/mentors', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createMember: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/members', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateMember: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/members/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteMember: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/members/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const MembersSection = () => {
  const [members, setMembers] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    position: '',
    description: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllMembers();
      setMembers(response.data);
    } catch (error) {
      setError('Failed to fetch members');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch members',
        placement: 'topRight',
      });
      console.error('Error fetching members:', error);
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

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.createMember(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Member added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add member',
        placement: 'topRight',
      });
      setError('Failed to add member');
      console.error('Error adding member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.updateMember(selectedMember._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Member updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update member',
        placement: 'topRight',
      });
      setError('Failed to update member');
      console.error('Error updating member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async () => {
    try {
      setIsLoading(true);
      await apiRequests.deleteMember(selectedMember._id);
      notification.success({
        message: 'Success',
        description: 'Member deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedMember(null);
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete member',
        placement: 'topRight',
      });
      setError('Failed to delete member');
      console.error('Error deleting member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      position: '',
      description: '',
      image: null
    });
    setPreviewUrl('');
    setSelectedMember(null);
  };

  if (isLoading && !members.length) {
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
        MEMBERS
      </motion.h1>
      
  
      <div className="mb-6">
        <AddButton title="MEMBER" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <Card
            key={member._id}
            image={member.image}
            title={member.title}
            subtitle={`Position: ${member.position}`}
            description={member.description}
            onEdit={() => {
              setSelectedMember(member);
              setFormData({
                title: member.title,
                position: member.position,
                description: member.description,
                image: null
              });
              setPreviewUrl(member.image);
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedMember(member);
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
                {isAddOpen ? 'Add New Member' : 'Edit Member'}
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
            <form onSubmit={isAddOpen ? handleAddMember : handleEditMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Profile Image</label>
                <div className="space-y-2">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-48 h-48 object-cover rounded-full mx-auto"
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
                <label className="block text-sm font-medium mb-1">Full Name</label>
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
                <label className="block text-sm font-medium mb-1">Position</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white"
                  required
                >
                  <option value="">Select Position</option>
                  {POSITION_OPTIONS.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="www.linkedin.com/in/username"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isAddOpen ? 'Add Member' : 'Update Member')}
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
              Are you sure you want to remove {selectedMember?.title} from the members list? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedMember(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMember}
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

export default MembersSection;