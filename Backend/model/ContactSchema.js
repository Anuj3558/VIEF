import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true,     // Removes whitespace from both ends
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation
    },
    phone: {
      type: String,
      trim: true, // Optional but trimmed
    },
    message: {
      type: String,
      required: true, // Message is mandatory
      trim: true,
    },
    type: {
      type: String,
      enum: ['individual', 'business'], // Only 'individual' or 'business' are allowed
      default: 'individual',
    },
    subject: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
