import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'lucide-react';



const PersonCard = ({ name, image, role, linkedin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <img 
      src={image} 
      alt={name} 
      className="w-full h-48 object-cover"
    />
    <motion.div 
      initial={{ y: '100%' }}
      whileHover={{ y: 0 }}
      transition={{ type: 'tween' }}
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-blue-800 p-3 text-white"
    >
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-blue-200 mb-2">{role}</p>
      {linkedin && (
        <a 
          href={linkedin} 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-100 hover:text-white transition-colors duration-200"
        >
          <Link className="w-4 h-4" />
          <span className="text-xs">LinkedIn</span>
        </a>
      )}
    </motion.div>
  </motion.div>
);

const TeamSection = ({ title, members }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="mb-16"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {members.map((member, index) => (
        <PersonCard key={index} {...member} />
      ))}
    </div>
  </motion.div>
);

const AboutUs = () => {
  const boardMembers = [
    {
      name: "Satyam Mitgutye",
      image: "",
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/satyammitgutye/"
    },
    {
      name: "Priya Sharma",
      image: "",
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/priyasharma/"
    },
    {
      name: "Rahul Gupta",
      image: "",
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/rahulgupta/"
    },
    {
      name: "Anita Desai",
      image: "",
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/anitadesai/"
    },
    {
      name: "Vikram Patel",
      image: "",
      role: "Board Member",
      linkedin: "https://www.linkedin.com/in/vikrampatel/"
    }
  ];

  const advisors = [
    {
      name: "Dr. Neha Kapoor",
      image: "",
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/drnehakapoor/"
    },
    {
      name: "Amit Verma",
      image: "",
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/amitverma/"
    },
    {
      name: "Sanjana Reddy",
      image: "",
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/sanjanareddy/"
    },
    {
      name: "Rajesh Kumar",
      image: "",
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/rajeshkumar/"
    },
    {
      name: "Meera Iyer",
      image: "",
      role: "Advisor",
      linkedin: "https://www.linkedin.com/in/meeraiyer/"
    }
  ];

  const mentors = [
    {
      name: "Arjun Malhotra",
      image: "",
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/arjunmalhotra/"
    },
    {
      name: "Kavita Joshi",
      image: "",
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/kavitajoshi/"
    },
    {
      name: "Suresh Raina",
      image: "",
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/sureshraina/"
    },
    {
      name: "Pooja Mehta",
      image: "",
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/poojamehta/"
    },
    {
      name: "Vivek Sharma",
      image: "",
      role: "Mentor",
      linkedin: "https://www.linkedin.com/in/viveksharma/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold mb-6"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-blue-100 max-w-3xl"
          >
            We are thrilled to announce a significant achievement for IIITD and
            our Incubation Centre. During the recent budget session, Ms. Atishi
            highlighted several key aspects. We continue to strive for excellence
            in innovation and entrepreneurship.
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <TeamSection title="Board Members" members={boardMembers} />
        <TeamSection title="Advisors Panel" members={advisors} />
        <TeamSection title="Mentors" members={mentors} />
      </main>
    </div>
  );
};

export default AboutUs;

