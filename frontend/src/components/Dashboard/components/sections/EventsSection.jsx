import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit2, Trash2, X, Upload } from 'lucide-react';
import AddButton from '../components/AddButton';

const EventsSection = () => {
  // States for managing events and UI
  const [events, setEvents] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'Tech Conference 2023',
      subtitle: 'Date: August 15, 2023',
      description: 'Annual tech conference featuring the latest innovations and industry leaders.',
      mode: 'OFFLINE'
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'Startup Pitch Night',
      subtitle: 'Date: September 5, 2023',
      description: 'An evening of innovative startup pitches and networking opportunities.',
      mode: 'ONLINE'
    },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    mode: 'OFFLINE',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add event handler
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      // In a real application, you would upload the image file to a server here
      // and get back a URL to store in the database
      const newEvent = {
        id: events.length + 1,
        ...formData,
        subtitle: `Date: ${formData.date}`,
        image: imagePreview || formData.image
      };
      
      setEvents(prev => [...prev, newEvent]);
      setIsAddOpen(false);
      setFormData({
        title: '',
        date: '',
        description: '',
        mode: 'OFFLINE',
        image: ''
      });
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Edit event handler
  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      // In a real application, handle image upload here if a new image was selected
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { 
              ...event, 
              ...formData, 
              subtitle: `Date: ${formData.date}`,
              image: imagePreview || formData.image
            }
          : event
      ));
      setIsEditOpen(false);
      setSelectedEvent(null);
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Delete event handler
  const handleDeleteEvent = async () => {
    try {
      setEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
      setIsDeleteOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Image input component
  const ImageInput = ({ preview, existingImage }) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-1">Image</label>
      <div className="space-y-2">
        {(preview || existingImage) && (
          <img
            src={preview || existingImage}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="image"
              placeholder="or paste image URL"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        EVENTS
      </motion.h1>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => console.log('Search:', e.target.value)}
        />
      </div>

      {/* Add Event Button */}
      <div className="mb-6">
        <AddButton title="EVENT" onClick={() => setIsAddOpen(true)} />
      </div>

      {/* Events Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{event.subtitle}</p>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setFormData({
                      title: event.title,
                      date: event.subtitle.replace('Date: ', ''),
                      description: event.description,
                      mode: event.mode,
                      image: event.image
                    });
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

      {/* Add Event Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Event</h2>
              <button onClick={() => setIsAddOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <ImageInput preview={imagePreview} />
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Event</h2>
              <button onClick={() => setIsEditOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditEvent} className="space-y-4">
              <ImageInput preview={imagePreview} existingImage={formData.image} />
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Event
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
            <p className="mb-6">Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsSection;