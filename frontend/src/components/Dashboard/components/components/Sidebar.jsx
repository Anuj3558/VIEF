import { motion } from 'framer-motion';

const Sidebar = ({ setActiveSection, activeSection }) => {
  const menuItems = [
    { title: 'Events', key: 'events' },
    { title: 'Startups', key: 'startups' },
    { title: 'Members', key: 'members' },
    { title: 'Awards', key: 'awards' },
    { title: 'Partnership', key: 'partnership' },
    { title: 'News and Articles', key: 'news' },
    { title: 'Sponsors', key: 'sponsors' },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 p-3 pt-3 h-screen bg-indigo-900 text-white  left-0 top-0"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-8"
      >
        Hello, Admin
      </motion.h1>
      
      <nav>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => setActiveSection(item.key)}
              className={`block w-full text-left py-2 px-4 mb-2 rounded hover:bg-indigo-800 transition-colors ${
                activeSection === item.key ? 'bg-indigo-800' : ''
              }`}
            >
              {item.title}
            </button>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;

