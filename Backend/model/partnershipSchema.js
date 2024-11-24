import mongoose from 'mongoose';

const { Schema } = mongoose;

const partnershipSchema = new Schema({
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
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Partnership = mongoose.model('Partnership', partnershipSchema);

export default Partnership;
