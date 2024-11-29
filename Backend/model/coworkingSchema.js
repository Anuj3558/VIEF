import mongoose from 'mongoose';

const CoworkingSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    amenities: {
        type:[String]
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    mapLink: {
        type: String,
        required: [true, 'Map link is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true, // This adds createdAt and updatedAt fields
    versionKey: false // Disable __v field
});

// Ensure uniqueness is not enforced on a null or undefined field

const CoworkingSpace = mongoose.model('CoworkingSpace', CoworkingSpaceSchema);

export default CoworkingSpace;