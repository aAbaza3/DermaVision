import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String, // مثلا: "Head", "Left Arm"
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Scan = mongoose.model('Scan', scanSchema);

export default Scan;
