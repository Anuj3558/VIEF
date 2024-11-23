import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from "react-icons/fa";
import { AboutUsbg, varunSIr, wc1 } from '../Assets/images';

const PersonCard = ({ name, image, role, linkedin }) => (
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

const TeamSection = ({ title, members }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="mb-24"
  >
    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {members.map((member, index) => (
        <PersonCard key={index} {...member} />
      ))}
    </div>
  </motion.div>
);

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
        {/* Background image for the header */}
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
            We are thrilled to announce a significant achievement for IIITD and
            our Incubation Centre. During the recent budget session, Ms. Atishi
            highlighted several key aspects. We continue to strive for excellence
            in innovation and entrepreneurship.
          </motion.p>
        </div>
        
      </motion.header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <TeamSection title="Board Members" members={boardMembers} />
        <TeamSection title="Advisors Panel" members={advisors} />
        <TeamSection title="Mentors" members={mentors} />
        <TeamSection title="Investors" members={mentors} />
      </main>
    </div>
  );
};

export default AboutUs;
