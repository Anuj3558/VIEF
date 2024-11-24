import mongoose from 'mongoose';

const { Schema } = mongoose;

const sponsorSchema = new Schema({
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

const Sponsor = mongoose.model('Sponsor', sponsorSchema);

export default Sponsor;
