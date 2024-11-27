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
  getAllEvents: () => {
    const accessToken = getAccessToken();
    return api.get('/client/events', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createEvent: (formData) => {
    const accessToken = getAccessToken();
    return api.post('/admin/events', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateEvent: (id, formData) => {
    const accessToken = getAccessToken();
    return api.put(`/admin/events/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteEvent: (id) => {
    const accessToken = getAccessToken();
    return api.delete(`/admin/events/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    mode: 'OFFLINE',
    image: null,
    nameUrl: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequests.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      setError('Failed to fetch events');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch events',
        placement: 'topRight',
      });
      console.error('Error fetching events:', error);
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

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      setIsAddLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('mode', formData.mode);
      formDataToSend.append('nameUrl', formData.nameUrl);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.createEvent(formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Event added successfully',
        placement: 'topRight',
      });
      setIsAddOpen(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add event',
        placement: 'topRight',
      });
      setError('Failed to add event');
      console.error('Error adding event:', error);
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      setIsEditLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('mode', formData.mode);
      formDataToSend.append('url', formData.nameUrl);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await apiRequests.updateEvent(selectedEvent._id, formDataToSend);
      notification.success({
        message: 'Success',
        description: 'Event updated successfully',
        placement: 'topRight',
      });
      setIsEditOpen(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update event',
        placement: 'topRight',
      });
      setError('Failed to update event');
      console.error('Error updating event:', error);
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      setIsDeleteLoading(true);
      await apiRequests.deleteEvent(selectedEvent._id);
      notification.success({
        message: 'Success',
        description: 'Event deleted successfully',
        placement: 'topRight',
      });
      setIsDeleteOpen(false);
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete event',
        placement: 'topRight',
      });
      setError('Failed to delete event');
      console.error('Error deleting event:', error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      description: '',
      mode: 'OFFLINE',
      image: null,
      nameUrl: ''
    });
    setPreviewUrl('');
    setSelectedEvent(null);
  };

  if (isLoading && !events.length) {
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
        EVENTS
      </motion.h1>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => console.log('Search:', e.target.value)}
        />
      </div>

      <div className="mb-6">
        <AddButton title="EVENT" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setFormData({
                      title: event.title,
                      date: event.date.split('T')[0],
                      description: event.description,
                      mode: event.mode,
                      image: null,
                      nameUrl: event.nameUrl
                    });
                    setPreviewUrl(event.image);
                    setIsEditOpen(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsDeleteOpen(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <span className="text-sm text-gray-600">{event.mode}</span>
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
                {isAddOpen ? 'Add New Event' : 'Edit Event'}
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
            <form onSubmit={isAddOpen ? handleAddEvent : handleEditEvent} className="space-y-4">
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
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
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
                <label className="block text-sm font-medium mb-1">Mode</label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="OFFLINE">Offline</option>
                  <option value="ONLINE">Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name URL</label>
                <input
                  type="url"
                  name="nameUrl"
                  value={formData.nameUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                disabled={isAddLoading || isEditLoading}
              >
                {isAddLoading || isEditLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  isAddOpen ? 'Add Event' : 'Update Event'
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
              Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedEvent(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                disabled={isDeleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 flex items-center justify-center"
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ? (
                  <>
                   
                    Deleting...
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

export default EventsSection;

