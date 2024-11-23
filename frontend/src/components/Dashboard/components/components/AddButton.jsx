import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const AddButton = ({ title, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg 
                 flex items-center justify-center gap-2 text-indigo-600 
                 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
    >
      <Plus className="w-5 h-5" />
      <span>ADD {title}</span>
    </motion.button>
  );
};

export default AddButton;

