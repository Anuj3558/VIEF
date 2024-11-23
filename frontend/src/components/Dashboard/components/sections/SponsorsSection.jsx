import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import AddButton from '../components/AddButton'
import Card from '../components/Card'

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'TechGiant Co.',
      subtitle: 'Sponsorship Level: Platinum',
      description: 'Leading technology company supporting innovation in startups.',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'EcoInvest Ltd.',
      subtitle: 'Sponsorship Level: Gold',
      description: 'Investment firm focused on supporting sustainable technology startups.',
    },
  ])

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedSponsor, setSelectedSponsor] = useState(null)
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

  const handleAddSponsor = (e) => {
    e.preventDefault()
    const newSponsor = {
      id: sponsors.length + 1,
      ...formData,
    }
    setSponsors((prev) => [...prev, newSponsor])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEditSponsor = (e) => {
    e.preventDefault()
    setSponsors((prev) =>
      prev.map((sponsor) => (sponsor.id === selectedSponsor.id ? { ...sponsor, ...formData } : sponsor))
    )
    setIsEditOpen(false)
    resetForm()
  }

  const handleDeleteSponsor = () => {
    setSponsors((prev) => prev.filter((sponsor) => sponsor.id !== selectedSponsor.id))
    setIsDeleteOpen(false)
    setSelectedSponsor(null)
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
        SPONSORS
      </motion.h1>

      <SearchBar onSearch={(value) => console.log('Search:', value)} />

      <div className="my-6">
        <AddButton title="SPONSOR" onClick={() => setIsAddOpen(true)} />
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map((sponsor) => (
          <Card
            key={sponsor.id}
            image={sponsor.image}
            title={sponsor.title}
            subtitle={sponsor.subtitle}
            description={sponsor.description}
            onEdit={() => {
              setSelectedSponsor(sponsor)
              setFormData({
                title: sponsor.title,
                subtitle: sponsor.subtitle,
                description: sponsor.description,
                image: sponsor.image,
              })
              setIsEditOpen(true)
            }}
            onRemove={() => {
              setSelectedSponsor(sponsor)
              setIsDeleteOpen(true)
            }}
          />
        ))}
      </motion.div>

      {/* Add Sponsor Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Sponsor</h2>
              <button onClick={() => setIsAddOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddSponsor} className="space-y-4">
              <ImageInput preview={imagePreview} />
              <div>
                <label className="block text-sm font-medium mb-1">Sponsor Title</label>
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
                Add Sponsor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Sponsor Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Sponsor</h2>
              <button onClick={() => setIsEditOpen(false)} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditSponsor} className="space-y-4">
              <ImageInput preview={imagePreview} existingImage={formData.image} />
              <div>
                <label className="block text-sm font-medium mb-1">Sponsor Title</label>
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
                Update Sponsor
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
            <p className="mb-6">Are you sure you want to delete "{selectedSponsor?.title}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDeleteSponsor} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SponsorsSection

