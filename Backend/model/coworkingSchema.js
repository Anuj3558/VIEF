import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const coworkingSpaceSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  mapLink: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const CoworkingSpace = model('CoworkingSpace', coworkingSpaceSchema);

export default CoworkingSpace;
