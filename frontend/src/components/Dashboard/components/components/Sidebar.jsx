import React from 'react';
import { motion } from 'framer-motion';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ setActiveSection, activeSection }) => {
  const navigate = useNavigate();

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
    navigate("/login");
    notification.success({
      message: 'Logout Successful',
      description: 'You have been successfully logged out.',
      placement: 'topLeft',
    });
  };

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-indigo-900 text-white flex flex-col overflow-hidden"
    >
      <div className="p-4 flex-shrink-0">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold"
        >
          Hello, Admin
        </motion.h1>
      </div>
      
      <nav className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-indigo-900">
        <div className="px-3 py-2">
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
        </div>
      </nav>

      <div className="p-4 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

