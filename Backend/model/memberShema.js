const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a Member
const memberSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, // Not required, as the image can be a URL or null initially
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model from the schema
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;