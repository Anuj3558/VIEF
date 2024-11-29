import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import ApplyButton from './compoents/ApplyButton';
import bgLanding from '../../Assets/images/bg-landing.jpeg';

const Hero = () => {
  return (
    <div className="relative pt-16 md:pt-20 bg-gray-900 overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgLanding})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-6 mx-auto sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center lg:text-left">
              <motion.h1
                className="montserrat-light tracking-tight text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className='space-y-3 text-4xl sm:text-5xl'>
                  <p className='flex flex-col lg:flex-row lg:items-center justify-center lg:justify-start'>
                  Launch Your Startup at  
                    <span className="text- lg:ml-2 font-semibold pl-3">  VIEF:</span>
                  </p>
                  <p>India’s Premier Innovation Hub</p>
                </div>
              </motion.h1>
              <motion.p
                className="mt-3 montserrat-main text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
VIEF empowers entrepreneurs to overcome challenges and turn their vision into reality. With personalized mentorship, resources, and funding, we ignite your potential to build a successful startup. Join us and shape your future!              </motion.p>
              <motion.div 
                className="mt-5 sm:mt-8 flex gap-5 items-center lg:items-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ApplyButton text={"Apply Now"} route={"/apply-now"} />
                <motion.div
                  className=" flex mt-1 items-center text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <FaPhoneAlt className="mr-2 text-[#FF4A11]" />
                  <span className="montserrat-main">+91-9667576014</span>
                </motion.div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;

