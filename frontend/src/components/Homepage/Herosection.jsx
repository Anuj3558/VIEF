import React from 'react';
import { motion } from 'framer-motion';
import ApplyButton from './compoents/ApplyButton';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('frontend/src/Assets/images/bg-landing.png')" }}
      >
        <div className="absolute inset-0 bg-slate-500 bg-opacity-60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block xl:inline">Launch Your Startup at </span>{' '}
                <span className="block text-indigo-600 xl:inline">IIED:</span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                IIED empowers aspiring entrepreneurs with the resources and support to turn ideas into reality. Join our vibrant community, connect with mentors, and be the change for India's future.
              </motion.p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <ApplyButton />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;