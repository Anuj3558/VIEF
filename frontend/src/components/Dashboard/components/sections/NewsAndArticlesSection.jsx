import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Card from '../components/Card';

const NewsAndArticlesSection = () => {
  const [articles] = useState([
    {
      id: 1,
      image: '/placeholder.jpg',
      title: 'The Future of AI in Startups',
      subtitle: 'Published: June 15, 2023',
      description: 'Exploring how artificial intelligence is shaping the startup ecosystem.',
    },
    {
      id: 2,
      image: '/placeholder.jpg',
      title: 'Sustainable Tech: A Growing Trend',
      subtitle: 'Published: July 2, 2023',
      description: 'How eco-friendly technologies are becoming a focus for innovative startups.',
    },
  ]);

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        NEWS AND ARTICLES
      </motion.h1>
      
      <SearchBar onSearch={(value) => console.log('Search:', value)} />
      <AddButton title="ARTICLE" onClick={() => console.log('Add article')} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
      >
        {articles.map((article) => (
          <Card
            key={article.id}
            image={article.image}
            title={article.title}
            subtitle={article.subtitle}
            description={article.description}
            onEdit={() => console.log('Edit:', article.id)}
            onRemove={() => console.log('Remove:', article.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default NewsAndArticlesSection;

