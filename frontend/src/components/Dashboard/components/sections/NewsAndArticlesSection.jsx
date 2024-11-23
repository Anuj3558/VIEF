import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const NewsAndArticlesSection = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'The Future of AI in Startups',
      subtitle: 'Published: June 15, 2023',
      description: 'Exploring how artificial intelligence is shaping the startup ecosystem.',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'Sustainable Tech: A Growing Trend',
      subtitle: 'Published: July 2, 2023',
      description: 'How eco-friendly technologies are becoming a focus for innovative startups.',
    },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    publishDate: '',
    description: '',
    image: '',
    content: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      const newArticle = {
        id: articles.length + 1,
        ...formData,
        subtitle: `Published: ${formatDate(formData.publishDate)}`,
        image: imagePreview || formData.image
      };
      
      setArticles(prev => [...prev, newArticle]);
      setIsAddOpen(false);
      setFormData({
        title: '',
        publishDate: '',
        description: '',
        image: '',
        content: ''
      });
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const handleEditArticle = async (e) => {
    e.preventDefault();
    try {
      setArticles(prev => prev.map(article => 
        article.id === selectedArticle.id 
          ? { 
              ...article, 
              ...formData, 
              subtitle: `Published: ${formatDate(formData.publishDate)}`,
              image: imagePreview || formData.image
            }
          : article
      ));
      setIsEditOpen(false);
      setSelectedArticle(null);
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDeleteArticle = async () => {
    try {
      setArticles(prev => prev.filter(article => article.id !== selectedArticle.id));
      setIsDeleteOpen(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
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
        NEWS AND ARTICLES
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      
      <div className="my-6">
        <AddButton title="ARTICLE" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Card
            key={article.id}
            image={article.image}
            title={article.title}
            subtitle={article.subtitle}
            description={article.description}
            onEdit={() => {
              setSelectedArticle(article);
              setFormData({
                title: article.title,
                publishDate: new Date().toISOString().split('T')[0], // Set current date as default
                description: article.description,
                image: article.image,
                content: article.content || ''
              });
              setIsEditOpen(true);
            }}
            onRemove={() => {
              setSelectedArticle(article);
              setIsDeleteOpen(true);
            }}
          />
        ))}
      </motion.div>

      {/* Add Article Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Article</h2>
              <button onClick={() => setIsAddOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddArticle} className="space-y-4">
              <ImageInput preview={imagePreview} />
              <div>
                <label className="block text-sm font-medium mb-1">Article Title</label>
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
                <label className="block text-sm font-medium mb-1">Publish Date</label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Article Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows="6"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Publish Article
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Article</h2>
              <button onClick={() => setIsEditOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditArticle} className="space-y-4">
              <ImageInput preview={imagePreview} existingImage={formData.image} />
              <div>
                <label className="block text-sm font-medium mb-1">Article Title</label>
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
                <label className="block text-sm font-medium mb-1">Publish Date</label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Article Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows="6"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Article
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
            <p className="mb-6">Are you sure you want to delete "{selectedArticle?.title}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteArticle}
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

export default NewsAndArticlesSection;