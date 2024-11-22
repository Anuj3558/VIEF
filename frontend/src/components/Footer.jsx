import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerSections = [
    {
      title: 'About',
      links: ['About us', 'Domains', 'Facilities', 'Scheme', 'Startups'],
    },
    {
      title: 'Updates',
      links: ['Events', 'Newsletter', 'Awards'],
    },
    {
      title: 'Careers',
      links: ['Jobs at IIED', 'Jobs as volunteer', 'Apply for Internship', 'Jobs at startups'],
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <motion.img 
            src="/images/logo.svg" 
            alt="Logo" 
            className="h-12"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="text-lg font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a 
                      href="#" 
                      className="hover:text-gray-900"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5 className="text-lg font-semibold mb-4">Sign up to our newsletter</h5>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; 2024 IIED. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

