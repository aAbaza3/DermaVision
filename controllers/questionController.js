import Question from "../models/questionModel.js"

// Create new question (from admin panel or postman)
export const createQuestion = async (req, res) => {
  try {
    const { text, type, options } = req.body;
    const question = new Question({ text, type, options });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Data' });
  }
};

// Get all active questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ active: true });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
