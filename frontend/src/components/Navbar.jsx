import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { logoPng } from '../Assets/images';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname === '/admin';
  const textColorClass = 'text-gray-800';
  const borderColorClass = 'border-gray-200';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { 
      name: 'About us ', 
      href: "", 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Facilities', href: '/facilities' },
        { name: 'Our Team', href: '/about-us' },
        { name: 'Domains', href: '/innovation-hub' },
        { name: 'Our Co-working place', href: '/Coworking' }
      ]
    },
    { name: 'Startup', href: '/startup' },
    { name: 'Schemes', href: '/apply-now' },
    { name: 'Events', href:" ", hasDropdown: true,
      dropdownItems: [
        { name: 'Our events', href: '/Events' },
        { name: 'Ideathon', href: '' },
        
      ] },
    { name: 'Achievements', href: '/achievements' },
     { name: 'Blog', href: '/Blog' },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' },
  ];

  const renderNavItems = (items) =>
    items.map((item) => (
      <motion.div
        key={item.name}
        className="relative group"
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={item.href}
          className={`${textColorClass} px-2 py-1 text-xs font-medium hover:bg-gray-100 rounded transition duration-300`}
        >
          {item.name}
        </Link>
        {item.hasDropdown && !isMobile && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {item.dropdownItems.map((dropdownItem) => (
                <Link
                  key={dropdownItem.name}
                  to={dropdownItem.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {dropdownItem.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    ));

  if (isAdminPage) return null;

  return (
    <nav className={`py-2 z-20 fixed top-0 left-0 right-0 bg-white shadow-md transition-all duration-300 ${isOpen ? 'h-screen lg:h-auto' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo on the left */}
          <motion.a
            href="/"
            className="flex-shrink-0"
            whileTap={{ scale: 0.95 }}
          >
            <img className="h-10 w-auto" src={logoPng} alt="IIED Logo" />
          </motion.a>

          {/* Navigation items on the right */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1 mr-6">
              {renderNavItems(navItems)}
            </div>
            <motion.div whileTap={{ scale: 0.95 }} className="flex space-x-2">
              <Link
                to="/vief-scholar"
                className="bg-orange-500 text-white px-4 py-2 rounded text-xs font-medium hover:bg-orange-600 transition duration-300"
              >
                 VIEF Scholar
              </Link>
              <Link
                to="/ip"
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded text-xs font-medium hover:bg-orange-100 transition duration-300"
              >
                Intellectual property
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${textColorClass} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500`}
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white overflow-y-auto max-h-[calc(100vh-3.5rem)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <React.Fragment key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-6 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="text-gray-600 block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              <Link
                to="/vief-scholar"
                className="bg-orange-500 text-white block px-4 py-3 rounded-md text-base font-medium hover:bg-orange-600 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                VIEF Scholar
              </Link>
              <Link
                to="/event-ideathon"
                className="border border-orange-500 text-orange-500 block px-4 py-3 rounded-md text-base font-medium hover:bg-orange-100 transition duration-300 mt-2"
                onClick={() => setIsOpen(false)}
              >
                Event Ideathon
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

