import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import AddButton from '../components/AddButton'
import Card from '../components/Card'

const PartnershipSection = () => {
  const [partnerships, setPartnerships] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'TechCorp Partnership',
      subtitle: 'Type: Strategic Alliance',
      description: 'Collaboration to develop cutting-edge technologies for startups.',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'GreenFund Collaboration',
      subtitle: 'Type: Financial Partnership',
      description: 'Joint initiative to fund and support eco-friendly startup projects.',
    },
  ])

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedPartnership, setSelectedPartnership] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPartnership = (e) => {
    e.preventDefault()
    const newPartnership = {
      id: partnerships.length + 1,
      ...formData,
    }
    setPartnerships((prev) => [...prev, newPartnership])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEditPartnership = (e) => {
    e.preventDefault()
    setPartnerships((prev) =>
      prev.map((partnership) =>
        partnership.id === selectedPartnership.id ? { ...partnership, ...formData } : partnership
      )
    )
    setIsEditOpen(false)
    resetForm()
  }

  const handleDeletePartnership = () => {
    setPartnerships((prev) => prev.filter((partnership) => partnership.id !== selectedPartnership.id))
    setIsDeleteOpen(false)
    setSelectedPartnership(null)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
    })
    setImageFile(null)
    setImagePreview('')
  }

  const ImageInput = ({ preview, existingImage }) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-1">Featured Image</label>
      <div className="space-y-2">
        {(preview || existingImage) && (
          <img src={preview || existingImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
        )}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
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
  )

  return (
    <div className="p-6">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
        PARTNERSHIPS
      </motion.h1>

      <div className="my-6">
        <SearchBar onSearch={(value) => console.log('Search:', value)} />
        <AddButton title="PARTNERSHIP" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partnerships.map((partnership) => (
          <Card
            key={partnership.id}
            image={partnership.image}
            title={partnership.title}
            subtitle={partnership.subtitle}
            description={partnership.description}
            onEdit={() => {
              setSelectedPartnership(partnership)
              setFormData({
                title: partnership.title,
                subtitle: partnership.subtitle,
                description: partnership.description,
                image: partnership.image,
              })
              setIsEditOpen(true)
            }}
            onRemove={() => {
              setSelectedPartnership(partnership)
              setIsDeleteOpen(true)
            }}
          />
        ))}
      </motion.div>

      {/* Add Partnership Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Partnership</h2>
              <button onClick={() => setIsAddOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddPartnership} className="space-y-4">
              <ImageInput preview={imagePreview} />
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
                  rows="2"
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Partnership
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Partnership Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Partnership</h2>
              <button onClick={() => setIsEditOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditPartnership} className="space-y-4">
              <ImageInput preview={imagePreview} existingImage={formData.image} />
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
                  rows="2"
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Update Partnership
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
              <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDeletePartnership} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PartnershipSection

