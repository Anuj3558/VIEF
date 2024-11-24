import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";

import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
import Card from "../components/Card";
import { StartupContext } from "../../../../contexts/StartupContext";

const StartupsSection = () => {
  const {
    currentStartups,
    successfulStartups,
    loading,
    error,
    addStartup,
    updateStartup,
    deleteStartup,
  } = useContext(StartupContext);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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
    addStartup(formData); // Use context function to add a startup
    setIsAddOpen(false);
    resetForm();
  };

  const handleEditStartup = async (e) => {
    e.preventDefault();
    updateStartup(selectedStartup.id, formData); // Use context function to update a startup
    setIsEditOpen(false);
    resetForm();
  };

  const handleDeleteStartup = () => {
    deleteStartup(selectedStartup.id); // Use context function to delete a startup
    setIsDeleteOpen(false);
    setSelectedStartup(null);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
    });
    setImageFile(null);
    setImagePreview("");
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

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <SearchBar onSearch={(value) => console.log("Search:", value)} />
      <AddButton title="STARTUP" onClick={() => setIsAddOpen(true)} />

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {currentStartups.map((startup) => (
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

      {/* Modals (Add, Edit, Delete) */}
      {/* Similar modal implementation for Add, Edit, Delete with updated handlers */}
      {/* Add Modal */}
      {isAddOpen && (
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
            <form onSubmit={handleAddStartup} className="space-y-4">
              <ImageInput preview={imagePreview} />
              {/* Form fields */}
            </form>
          </div>
        </div>
      )}
      {/* Similar implementation for Edit and Delete modals */}
    </div>
  );
};

export default StartupsSection;