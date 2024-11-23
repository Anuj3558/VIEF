import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const AwardsSection = () => {
  const [awards] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'Innovation Excellence Award',
      subtitle: 'Recipient: TechInnovate',
      description: 'Awarded for groundbreaking advancements in AI technology.',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'Sustainability Champion Award',
      subtitle: 'Recipient: GreenEnergy',
      description: 'Recognized for outstanding contributions to sustainable urban energy solutions.',
    },
  ]);

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        AWARDS
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      <AddButton title="AWARD" onClick={() => console.log('Add award')} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
      >
        {awards.map((award) => (
          <Card
            key={award.id}
            image={award.image}
            title={award.title}
            subtitle={award.subtitle}
            description={award.description}
            onEdit={() => console.log('Edit:', award.id)}
            onRemove={() => console.log('Remove:', award.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AwardsSection;

