import mongoose from "mongoose";

export const userProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentQuestionOrder: { type: Number, default: 1 },
    isConfirmed: { type: Boolean, default: false },
    selectedAnswer: { type: String, default: null }
  });

  const userProgress = mongoose.model("UserProgress", userProgressSchema);
  export default userProgress