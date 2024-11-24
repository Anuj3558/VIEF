import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ['OFFLINE', 'ONLINE'],
      required: true,
    },
    image: {
      type: String, // URL or base64 string for image
      required: false, // Optional in case of placeholder or no image
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
