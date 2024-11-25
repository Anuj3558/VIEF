'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from "react-icons/fa";
import { AboutUsbg, varunSIr, wc1 } from '../Assets/images';

export const PersonCard = ({ name, image, role, linkedin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    <div className="aspect-[3/4] overflow-hidden">
      <img 
        src={image || wc1} 
        alt={name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/90 p-6 transform translate-y-0 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold text-gray-900">{name}</p>
          <p className="text-sm font-medium text-gray-600">{role}</p>
        </div>
        {linkedin && (
          <a 
            href={linkedin} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <FaLinkedin className="text-3xl text-blue-600 hover:text-blue-700 transition-colors duration-200" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export const TeamSection = ({ title, members ,homePage }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleMembers = showAll ? members : members.slice(0, 4);
console.log(homePage)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mb-24"
    >
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleMembers.map((member, index) => (
          <PersonCard key={index} {...member} />
        ))}
      </div>
      {(members.length > 4 && !homePage) ? (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[]  text-black underline font-bold py-2 px-4 rounded transition duration-300"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      ): <a
      href='/about-us'>
        <div className="mt-8 text-center">
      <button
       
        className="bg-[]  text-black underline font-bold py-2 px-4 rounded transition duration-300"
      >
        See All 
      </button>
    </div>
        </a>}
    </motion.div>
  );
};

const AboutUs = () => {
  const boardMembers = [
    {
      name: "Mr Venkatesh Bharti",
      image: varunSIr,
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/satyammitgutye/"
    },
    {
      name: "Satyam Mitgutye",
      image: varunSIr,
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/satyammitgutye/"
    },
    {
      name: "Satyam Mitgutye",
      image: varunSIr,
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/satyammitgutye/"
    },
    {
      name: "Satyam Mitgutye",
      image: varunSIr,
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/satyammitgutye/"
    },
    {
      name: "Additional Board Member",
      image: varunSIr,
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/additionalmember/"
    }
  ];

  const advisors = [
    {
      name: "Dr. Neha Kapoor",
      image: varunSIr,
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/drnehakapoor/"
    },
    {
      name: "Dr. Neha Kapoor",
      image: varunSIr,
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/drnehakapoor/"
    },
    {
      name: "Dr. Neha Kapoor",
      image: varunSIr,
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/drnehakapoor/"
    },
    {
      name: "Dr. Neha Kapoor",
      image: varunSIr,
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/drnehakapoor/"
    },
    {
      name: "Additional Advisor",
      image: varunSIr,
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/additionaladvisor/"
    }
  ];

  const mentors = [
    {
      name: "Arjun Malhotra",
      image: varunSIr,
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/arjunmalhotra/"
    },
    {
      name: "Arjun Malhotra",
      image: varunSIr,
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/arjunmalhotra/"
    },
    {
      name: "Arjun Malhotra",
      image: varunSIr,
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/arjunmalhotra/"
    },
    {
      name: "Arjun Malhotra",
      image: varunSIr,
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/arjunmalhotra/"
    },
    {
      name: "Additional Mentor",
      image: varunSIr,
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/additionalmentor/"
    }
  ];

  const investors = [
    {
      name: "John Doe",
      image: varunSIr,
      role: "Investor",
      linkedin: "https://www.linkedin.com/in/johndoe/"
    },
    {
      name: "Jane Smith",
      image: varunSIr,
      role: "Investor",
      linkedin: "https://www.linkedin.com/in/janesmith/"
    },
    {
      name: "Robert Johnson",
      image: varunSIr,
      role: "Investor",
      linkedin: "https://www.linkedin.com/in/robertjohnson/"
    },
    {
      name: "Emily Brown",
      image: varunSIr,
      role: "Investor",
      linkedin: "https://www.linkedin.com/in/emilybrown/"
    },
    {
      name: "Additional Investor",
      image: varunSIr,
      role: "Investor",
      linkedin: "https://www.linkedin.com/in/additionalinvestor/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative pt-36"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-"
          style={{ backgroundImage: `url(${AboutUsbg})` }} 
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-7xl font-bold mb-4 text-white"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xl text-white max-w-3xl pt-6 pb-14  mx-auto leading-relaxed"
          >
            VIEF ignite entrepreneurial potential by turning visionary ideas into successful startups. With cutting-edge mentorship, tailored resources, funding access, and a vibrant network, we accelerate growth and innovation. Join us to shape the future of business!
          </motion.p>
        </div>
      </motion.header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <TeamSection title="Board Members" members={boardMembers} />
        <TeamSection title="Advisors Panel" members={advisors} />
        <TeamSection title="Mentors" members={mentors} />
        <TeamSection title="Investors" members={investors} />
      </main>
    </div>
  );
};

export default AboutUs;

