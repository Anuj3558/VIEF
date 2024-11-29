import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash, MapPin, Edit2, Trash2 } from 'lucide-react';



const CoworkingSpaceCard = ({ space, onEdit, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img src={space.image} alt={space.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {space.address}
        </p>
        <p className="text-gray-700 mb-4">{space.description}</p>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1">Amenities:</h4>
          <div className="flex flex-wrap gap-2">
            {space.amenities.map((amenity, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {amenity.replace(/"/g, '')}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <a
            href={space.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            View on Map
          </a>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={onRemove}
              className="p-2 text-red-600 hover:bg-red-100 rounded-full"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoworkingSpaceCard;

