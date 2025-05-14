// models/ConfirmedAnswer.js
import mongoose from 'mongoose'

const confirmedAnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  answerText: { type: String, required: true },
  image: { type: String }, // الصورة اللي شافها قبل التأكيد
  confirmedAt: { type: Date, default: Date.now }
});

const ConfirmedAnswer = mongoose.model("ConfirmedAnswer", confirmedAnswerSchema);
export default ConfirmedAnswer