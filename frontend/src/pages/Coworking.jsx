import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Sample Co-working Places Data
const coworkingPlaces = [
  {
    id: 1,
    name: "Innovation Hub - Main Campus",
    address: "123 Tech Avenue, Innovation District, Techville, State 54321",
    description: "Our flagship co-working space designed for startups and innovators. Equipped with state-of-the-art facilities and collaborative work environments.",
    amenities: [
      "High-speed Internet",
      "Meeting Rooms",
      "24/7 Access",
      "Printing Facilities",
      "Coffee Lounge"
    ],
    image: "https://cdn.prod.website-files.com/66a08e07fa6352714fc1d6da/6736e9da679902562f7465ae_66fb0915a36e3ea34c9bfe71_66a0ab1154aa172e8ef87c6b_spaceierge%25252Bcoworking.jpeg",
    mapLink: "https://maps.google.com"
  },
  {
    id: 2,
    name: "Digital Workspace - Downtown",
    address: "456 Creative Street, Business Center, Metropolis, State 12345",
    description: "A modern co-working environment perfect for digital professionals and remote teams. Designed to inspire creativity and productivity.",
    amenities: [
      "Private Cabins",
      "Video Conference Rooms",
      "Ergonomic Workstations",
      "Networking Events"
    ],
    image: "https://cdn.prod.website-files.com/66a08e07fa6352714fc1d6da/6736e933a500fd87dee3e38a_66f25bbe5bcaeaf2d06b8dd3_66a0a94a2c500c332b6f2604_DevX_coworkig_space-2-1024x683.jpeg",
    mapLink: "https://maps.google.com"
  },
  {
    id: 3,
    name: "Startup Incubator - Tech Park",
    address: "789 Innovation Road, Tech Park, Cyber City, State 67890",
    description: "A dedicated space for emerging startups with mentorship programs, networking opportunities, and comprehensive support infrastructure.",
    amenities: [
      "Startup Mentorship",
      "Investor Connect",
      "Pitch Rooms",
      "Tech Resources"
    ],
    image: "https://cdn.prod.website-files.com/66a08e07fa6352714fc1d6da/6736e9da679902562f7465ae_66fb0915a36e3ea34c9bfe71_66a0ab1154aa172e8ef87c6b_spaceierge%25252Bcoworking.jpeg",
    mapLink: "https://maps.google.com"
  }
];

const CoworkingPlaceCard = ({ place }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg text-justify font-bold mb-3 text-gray-800">{place.name}</h3>
        
        <div className="flex-grow">
          <p className="text-gray-600 text-sm text-justify
           mb-4 line-clamp-3">{place.description}</p>
          <div className="flex flex-wrap gap-2 mt-2 mb-4 min-h-[50px]">
            {place.amenities.map((amenity, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-xs px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-orange-500 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-00 text-sm">{place.address}</p>
          </div>
          <a 
            href={place.mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full block text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            View on Map
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const CoworkingPlaces = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter places based on search
  const filteredPlaces = coworkingPlaces.filter(place => 
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center  mt-14 mb-10 text-gray-800"
      >
        Our Co-working Places
      </motion.h1>
      
      {/* Search Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 flex justify-center"
      >
        <input 
          type="text"
          placeholder="Search co-working places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border-2 border-gray-200 rounded-full 
          focus:outline-none focus:border-orange-500 transition-all duration-300"
        />
      </motion.div>

      {/* Co-working Places Grid */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPlaces.map(place => (
          <CoworkingPlaceCard key={place.id} place={place} />
        ))}
      </motion.div>

      {filteredPlaces.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-gray-500 mt-12"
        >
          No co-working places found matching your search
        </motion.div>
      )}
    </motion.div>
  );
};

export default CoworkingPlaces;