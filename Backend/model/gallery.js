import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Set to true if the title is mandatory
      trim: true,     // Removes whitespace from both ends
    },
    subtitle: {
      type: String,
      trim: true,
    },
    photo: {
      type: String, // Assuming this is a URL or file path
      default: null, // Default value is null
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Gallery = mongoose.model('Gallery', GallerySchema);

export default Gallery;
