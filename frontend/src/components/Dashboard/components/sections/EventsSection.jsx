import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const EventsSection = () => {
  const [events] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'Tech Conference 2023',
      subtitle: 'Date: August 15, 2023',
      description: 'Annual tech conference featuring the latest innovations and industry leaders.',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'Startup Pitch Night',
      subtitle: 'Date: September 5, 2023',
      description: 'An evening of innovative startup pitches and networking opportunities.',
    },
  ]);

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        EVENTS
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      <AddButton title="EVENT" onClick={() => console.log('Add event')} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
      >
        {events.map((event) => (
          <Card
            key={event.id}
            image={event.image}
            title={event.title}
            subtitle={event.subtitle}
            description={event.description}
            onEdit={() => console.log('Edit:', event.id)}
            onRemove={() => console.log('Remove:', event.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default EventsSection;

