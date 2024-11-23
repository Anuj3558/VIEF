import React from 'react';
import { motion } from 'framer-motion';
import { logoPng } from '../Assets/images';

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
      links: ['Jobs at VIEF', 'Jobs as volunteer', 'Apply for Internship', 'Jobs at startups'],
    },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <motion.img 
            src={logoPng} 
            alt="Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Domains</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Facilities</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Scheme</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Startups</a></li>
            </ul>
          </div>

          {/* Updates Section */}
          <div>
            <h3 className="font-semibold mb-4">Updates</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Newsletters</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Awards</a></li>
            </ul>
          </div>

          {/* Career Section */}
          <div>
            <h3 className="font-semibold mb-4">Career</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Jobs at VIEF</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Join as volunteer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Apply for internship</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Jobs at startup</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-600 mb-4">
              VIEF empowers aspiring entrepreneurs with the resources and support to turn ideas 
              into reality. Join our vibrant community, connect with mentors, and be the change 
              for India's future
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md sm:rounded-r-none"
              />
              <button className="bg-blue-900 text-white px-4 py-2 rounded-md sm:rounded-l-none whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            Copyright © 2024 VIEF | All Rights Reserved
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;