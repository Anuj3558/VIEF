import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import EventsSection from './sections/EventsSection';
import StartupsSection from './sections/StartupsSection';
import MembersSection from './sections/MembersSection';
import AwardsSection from './sections/AwardsSection';
import SchemeSection from './sections/Scheme';
import NewsAndArticlesSection from './sections/NewsAndArticlesSection';
import SponsorsSection from './sections/SponsorsSection';
import GallerySection from './sections/GallerySection';
import ContactsSection from './sections/Contacted';
import CoworkingSection from './sections/Coworking';
import BlogSection from './sections/BlogSection';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('events');

  const renderSection = () => {
    switch (activeSection) {
      case 'events':
        return <EventsSection />;
      case 'startups':
        return <StartupsSection />;
      case 'members':
        return <MembersSection />;
      case 'awards':
        return <AwardsSection />;
      case 'Schemes':
        return <SchemeSection />;
      case 'news':
        return <NewsAndArticlesSection />;
      case 'sponsors':
        return <SponsorsSection />;
      case 'Gallery':
        return <GallerySection />;
      case 'contacted':
        return <ContactsSection />;
      case 'Coworking':
        return <CoworkingSection />;
      case 'Blog':
        return <BlogSection />;
      default:
        return <EventsSection />;
    }
  };

  return (
    <div className="flex w-full flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-4 lg:p-8 overflow-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Dashboard;

