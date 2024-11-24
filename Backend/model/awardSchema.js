import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  recipient: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
 // This will store recipient info
}, { timestamps: true });

const Award = mongoose.model('Award', awardSchema);

export default Award;
