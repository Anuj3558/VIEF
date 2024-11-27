import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Pre-Incubation Schema
const PreIncubationSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  applyButtonLink: {
    type: String,
    default: '#'
  },
  deadline: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model for the Pre-Incubation Schema
const Scheme = mongoose.model('PreIncubation', PreIncubationSchema);

export default Scheme;
