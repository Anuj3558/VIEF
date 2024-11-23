import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import EventsSection from './sections/EventsSection';
import StartupsSection from './sections/StartupsSection';
import MembersSection from './sections/MembersSection';
import AwardsSection from './sections/AwardsSection';
import PartnershipSection from './sections/PartnershipSection';
import NewsAndArticlesSection from './sections/NewsAndArticlesSection';
import SponsorsSection from './sections/SponsorsSection';

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
      case 'partnership':
        return <PartnershipSection />;
      case 'news':
        return <NewsAndArticlesSection />;
      case 'sponsors':
        return <SponsorsSection />;
      default:
        return <EventsSection />;
    }
  };

  return (
    <div className="flex pt-20" >
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 ml-64 bg-gray-50  min-h-screen"
      >
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Dashboard;

