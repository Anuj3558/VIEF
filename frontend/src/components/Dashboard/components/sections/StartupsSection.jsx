import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const StartupsSection = () => {
  const [startups] = useState([
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
      <AddButton title="STARTUP" onClick={() => console.log('Add startup')} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
      >
        {startups.map((startup) => (
          <Card
            key={startup.id}
            image={startup.image}
            title={startup.title}
            subtitle={startup.subtitle}
            description={startup.description}
            onEdit={() => console.log('Edit:', startup.id)}
            onRemove={() => console.log('Remove:', startup.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default StartupsSection;

