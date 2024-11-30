import React from 'react';
import { motion } from 'framer-motion';
import { logoPng } from '../Assets/images';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isAdminPage = location.pathname === '/admin';

  const footerSections = [
    {
      title: 'About',
      links: [
        { name: 'About us', url: '/about-us' },
        { name: 'Domains', url: '/innovation-hub' },
        { name: 'Facilities', url: '/facilities' },
        { name: 'Scheme', url: '/apply-now' },
        { name: 'Startups', url: '/startup' },
      ],
    },
    {
      title: 'Updates',
      links: [
        { name: 'Events', url: '/events' },
        { name: 'Newsletter', url: '/news-letter' },
        { name: 'Awards', url: '/achievements' },
      ],
    },
    {
      title: 'Careers',
      links: [
        { name: 'Jobs at VIEF', url: 'https://forms.gle/Aw2MwpAGsxwS4Xri7' },
        { name: 'Jobs as volunteer', url: 'https://forms.gle/bGnuEqjWbkC4gjcp8 ' },
        { name: 'Apply for Internship', url: 'https://forms.gle/Jg8CRqzvHR6CdfPJA ' },
        { name: 'Jobs at startups', url: 'https://forms.gle/Vk3rHv52Rn775qBt7 ' },
      ],
    },
  ];
  
    


  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/tCtA3ezCQZgTBqUs/?mibextid=LQQJ4d",
      icon: (
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/v_i_e_f?igsh=MTQzenk3azNuMDVkOQ==",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/showcase/vastav-incubatex-entrepreneurship-foundation-vief/",
      icon: (
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@VastavIntellect",
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
    },
  ];

  if (isAdminPage) return null;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter Section - Moved to the left */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1 items-start text-left order-first lg:order-none">
            <h3 className="font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-600 mb-4 text-sm">
              VIEF empowers aspiring entrepreneurs with the resources and support to turn ideas 
              into reality. Join our vibrant community, connect with mentors, and be the change 
              for India's future.
            </p>
          
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className="text-gray-600 hover:text-gray-900 text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            Copyright © {currentYear} VIEF | All Rights Reserved
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a key={social.name} target='blank' href={social.url} className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">{social.name}</span>
                <svg 
                  className="h-5 w-5" 
                  fill="currentColor" 
                  viewBox={social.name === 'X' ? "0 0 24 24" : (social.name === 'YouTube' ? "0 0 24 24" : "0 0 24 24")}
                >
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;