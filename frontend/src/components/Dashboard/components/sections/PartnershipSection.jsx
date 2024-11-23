import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const PartnershipSection = () => {
  const [partnerships] = useState([
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
  ]);

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        PARTNERSHIP
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      <AddButton title="PARTNERSHIP" onClick={() => console.log('Add partnership')} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
      >
        {partnerships.map((partnership) => (
          <Card
            key={partnership.id}
            image={partnership.image}
            title={partnership.title}
            subtitle={partnership.subtitle}
            description={partnership.description}
            onEdit={() => console.log('Edit:', partnership.id)}
            onRemove={() => console.log('Remove:', partnership.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PartnershipSection;

