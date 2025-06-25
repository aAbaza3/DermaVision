import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  question: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question', 
    required: true 
  },
   answer: {
    type: [String], 
    required: true
  }
});

export default mongoose.model('Answer', answerSchema);
