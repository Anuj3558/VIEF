import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { logoPng } from '../Assets/images';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname === '/admin';
  const textColorClass = isHomePage ? 'text-black' : 'text-black';
  const borderColorClass = isHomePage ? 'border-white' : 'border-black';

  // Combined all nav items into a single array
  const navItems = [
    {name:"Home" ,href:"/"},
    { name : 'About us' ,href :"/about-us"},
   
    { name: 'Startup', href: '/startup' },
    { name: 'Schemes', href: '/apply-now', hasDropdown: true },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Events', href: '/events', hasDropdown: true },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' },
    {name :"VIEF Scholar" ,href :"/"}
   
  ];

  const renderNavItems = (items) =>
    items.map((item) => (
      <motion.div
        key={item.name}
        className="relative group"
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to={item.href}
          className={`${textColorClass} px-3 py-2 rounded-md text-sm font-medium`}
        >
          {item.name}

        </Link>
        {item.hasDropdown && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
              >
                Option 1
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
              >
                Option 2
              </Link>
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
              >
                Option 3
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    ));

  if (isAdminPage) return null;

  return (
    <nav className={`py-3 z-20 absolute montserrat-light bg-transparent w-full font-sans border-b ${borderColorClass} md:border-opacity-100 bg-white text-black border-opacity-0`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 pb-3">
          {/* Logo on the left */}
          <motion.a
            href="/"
            className="flex-shrink-0"
            whileTap={{ scale: 0.9 }}
          >
            <img className="h-12 mt-5 w-auto" src={logoPng} alt="IIED Logo" />
          </motion.a>

          {/* Navigation items on the right */}
          <div className="hidden md:flex items-center ">
            {renderNavItems(navItems)}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${textColorClass} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
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
      {isOpen && (
        <motion.div
          className="md:hidden bg-white mt-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;