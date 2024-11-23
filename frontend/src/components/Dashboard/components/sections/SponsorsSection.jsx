import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const SponsorsSection = () => {
  const [sponsors] = useState([
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
  ]);

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        SPONSORS
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      <AddButton title="SPONSOR" onClick={() => console.log('Add sponsor')} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
      >
        {sponsors.map((sponsor) => (
          <Card
            key={sponsor.id}
            image={sponsor.image}
            title={sponsor.title}
            subtitle={sponsor.subtitle}
            description={sponsor.description}
            onEdit={() => console.log('Edit:', sponsor.id)}
            onRemove={() => console.log('Remove:', sponsor.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SponsorsSection;

