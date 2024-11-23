import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const MembersSection = () => {
  const [members] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'John Doe',
      subtitle: 'Position: Board Member',
      description: 'LinkedIn: www.linkedin.com/in/johndoe',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'Jane Smith',
      subtitle: 'Position: Advisor',
      description: 'LinkedIn: www.linkedin.com/in/janesmith',
    },
  ]);

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        MEMBERS
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      <AddButton title="MEMBER" onClick={() => console.log('Add member')} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
      >
        {members.map((member) => (
          <Card
            key={member.id}
            image={member.image}
            title={member.title}
            subtitle={member.subtitle}
            description={member.description}
            onEdit={() => console.log('Edit:', member.id)}
            onRemove={() => console.log('Remove:', member.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MembersSection;

