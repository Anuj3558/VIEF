import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ setActiveSection, activeSection }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { title: 'Events', key: 'events' },
    { title: 'Startups', key: 'startups' },
    { title: 'Members', key: 'members' },
    { title: 'Awards', key: 'awards' },
    { title: 'Schemes', key: 'Schemes' },
    { title: 'News and Articles', key: 'news' },
    { title: 'Sponsors', key: 'sponsors' },
    { title: 'Gallery', key: 'Gallery' },
    { title: 'Contacted People', key: 'contacted' },
    { title: 'Add Coworking Places', key: 'Coworking' },
    { title: 'Add Blog', key: 'Blog' },
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 text-white bg-indigo-900 p-2 rounded-md lg:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <motion.div 
        initial={false}
        animate={{ 
          x: (isLargeScreen || isOpen) ? 0 : -250,
          width: isLargeScreen ? 'auto' : 250
        }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 z-10 h-screen bg-indigo-900 text-white flex flex-col overflow-hidden lg:relative`}
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
                  onClick={() => {
                    setActiveSection(item.key);
                    if (!isLargeScreen) {
                      setIsOpen(false);
                    }
                  }}
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
    </>
  );
};

export default Sidebar;

