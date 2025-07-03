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
     enum: ['Head', 'Body', 'Left Arm', 'Right Arm', 'Left Leg', 'Right Leg']
  },
  diagnosis: {
    type: String, // e.g. melanoma, nevus, etc.
    default: 'Pending'
  },
  confidence: {
    type: Number, // e.g. 0.92 (92%)
    default: null
  },
    riskLevel: {
    type: String,
    default: 'Low'
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Scan = mongoose.model('Scan', scanSchema);

export default Scan;
