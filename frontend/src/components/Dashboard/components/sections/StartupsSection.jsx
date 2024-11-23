import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const StartupsSection = () => {
  const [startups, setStartups] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'TechInnovate',
      subtitle: 'Status: Current',
      description: 'A cutting-edge startup focusing on AI-driven solutions for businesses.',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'GreenEnergy',
      subtitle: 'Status: Successful',
      description: 'Innovative startup developing sustainable energy solutions for urban areas.',
    },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStartup = (e) => {
    e.preventDefault();
    const newStartup = {
      id: startups.length + 1,
      ...formData,
    };
    setStartups((prev) => [...prev, newStartup]);
    setIsAddOpen(false);
    resetForm();
  };

  const handleEditStartup = (e) => {
    e.preventDefault();
    setStartups((prev) =>
      prev.map((startup) =>
        startup.id === selectedStartup.id
          ? { ...startup, ...formData }
          : startup
      )
    );
    setIsEditOpen(false);
    resetForm();
  };

  const handleDeleteStartup = () => {
    setStartups((prev) => prev.filter((startup) => startup.id !== selectedStartup.id));
    setIsDeleteOpen(false);
    setSelectedStartup(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
    });
    setImageFile(null);
    setImagePreview('');
  };

  const ImageInput = ({ preview, existingImage }) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-1">Featured Image</label>
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
        STARTUPS
      </motion.h1>

      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      <AddButton title="STARTUP" onClick={() => setIsAddOpen(true)} />

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {startups.map((startup) => (
          <Card
            key={startup.id}
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
                image: startup.image,
              });
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedStartup(startup);
              setIsDeleteOpen(true);
            }}
          />
        ))}
      </motion.div>

      {/* Add Startup Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Startup</h2>
              <button onClick={() => setIsAddOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddStartup} className="space-y-4">
              <ImageInput preview={imagePreview} />
              <div>
                <label className="block text-sm font-medium mb-1">Startup Title</label>
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
                  rows="2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Startup
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Startup Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Startup</h2>
              <button onClick={() => setIsEditOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditStartup} className="space-y-4">
              <ImageInput preview={imagePreview} existingImage={formData.image} />
              <div>
                <label className="block text-sm font-medium mb-1">Startup Title</label>
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
                  rows="2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Startup
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
            <p className="mb-6">Are you sure you want to delete "{selectedStartup?.title}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStartup}
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

export default StartupsSection;
