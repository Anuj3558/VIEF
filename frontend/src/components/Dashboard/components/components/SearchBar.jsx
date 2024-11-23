import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-4 mb-6"
    >
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 border rounded-lg hover:bg-gray-50"
      >
        <Filter className="w-5 h-5 text-gray-600" />
      </motion.button>
    </motion.div>
  );
};

export default SearchBar;

