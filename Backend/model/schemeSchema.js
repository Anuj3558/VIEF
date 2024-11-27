import mongoose from "mongoose";

// Define the Scheme Schema
const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String, // Or you can use Date type if you need proper date parsing
      required: true,
    },
    deadline: {
      type: String, // You can also use Date type or any custom format you prefer
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Assuming the image is stored as a URL (or you can store a path if you save images locally)
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create the Scheme model
const Scheme = mongoose.model("Scheme", schemeSchema);

export default Scheme;
