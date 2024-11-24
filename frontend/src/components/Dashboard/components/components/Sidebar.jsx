import React from 'react';
import { motion } from 'framer-motion';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

const Sidebar = ({ setActiveSection, activeSection }) => {
  const menuItems = [
    { title: 'Events', key: 'events' },
    { title: 'Startups', key: 'startups' },
    { title: 'Members', key: 'members' },
    { title: 'Awards', key: 'awards' },
    { title: 'Partnership', key: 'partnership' },
    { title: 'News and Articles', key: 'news' },
    { title: 'Sponsors', key: 'sponsors' },
    { title: 'Gallery', key: 'gallery' },
    { title: 'Contacted People', key: 'contacted' },
    { title: 'Add Trending Event', key: 'addTrendingEvent' },
  ];

  const handleLogout = () => {
    Cookies.remove('authToken');
    redirect("/login")
    notification.success({
      message: 'Logout Successful',
      description: 'You have been successfully logged out.',
      placement: 'topLeft',
    });
    // Add any additional logout logic here (e.g., redirecting to login page)
  };

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 p-3 pt-3 h-screen bg-indigo-900 text-white left-0 top-0 flex flex-col"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-8"
      >
        Hello, Admin
      </motion.h1>
      
      <nav className="flex-grow overflow-y-auto">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => setActiveSection(item.key)}
              className={`block w-full text-left py-2 px-4 mb-2 rounded hover:bg-indigo-800 transition-colors ${
                activeSection === item.key ? 'bg-indigo-800' : ''
              }`}
            >
              {item.title}
            </button>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-auto"
      >
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;

