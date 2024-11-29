import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

const Card = ({ image, title, subtitle, description, onEdit, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-4 rounded-lg shadow-sm border"
    >
      <div className="flex gap-4">
        {image && (
          <img 
            src={image} 
            alt={title}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          {description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description.slice(0,30)}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-indigo-600"
        >
          <Edit2 className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRemove}
          className="p-2 text-gray-600 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Card;

