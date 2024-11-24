import mongoose from 'mongoose';

const { Schema } = mongoose;

const startupSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // Can store a URL or base64 string for image
      default: '',
    },
    status: {
      type: String,
      enum: ['Current', 'Successful'], // example statuses
      default: 'Current',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

const Startup = mongoose.model('Startup', startupSchema);

export default Startup;
