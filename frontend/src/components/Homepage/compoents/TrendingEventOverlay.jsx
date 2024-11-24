import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const TrendingEventOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const COOKIE_NAME = 'hasSeenTrendingEventOverlay';

  useEffect(() => {
    const hasSeenOverlay = Cookies.get(COOKIE_NAME);
    if (!hasSeenOverlay) {
      setIsVisible(true);
      
      // Set cookie with 3-hour expiration
      const threeHoursFromNow = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
      Cookies.set(COOKIE_NAME, 'true', {
        expires: threeHoursFromNow,
        path: '/',
        sameSite: 'strict'
      });
    }
  }, []);

  const closeOverlay = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Trending Event
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Don't miss our upcoming tech conference! Join industry leaders and innovators 
            for a day of inspiring talks and networking opportunities.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-100">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                Date: July 15, 2023
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                Time: 9:00 AM - 5:00 PM
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                Location: Tech Hub Convention Center
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <a
              href="/events"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 
                transition duration-300 font-medium text-sm"
            >
              Learn More
            </a>
            <button
              onClick={closeOverlay}
              className="text-gray-500 hover:text-gray-700 transition duration-300 
                px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icons components
const CalendarIcon = ({ className }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
    />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
    />
  </svg>
);

export default TrendingEventOverlay;