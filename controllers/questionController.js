import Question from "../models/questionModel.js"

// Create new question (from admin panel or postman)
export const createQuestion = async (req, res) => {
  try {
   const { text, order, isMultiChoice, answer ,active} = req.body;
   const question = new Question({ text, order, isMultiChoice, answer, active });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error("Error while creating question:", err);
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

// Toggle active status
export const toggleQuestionActive = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    question.active = !question.active;
    await question.save();

    res.json({ message: "Question status updated", active: question.active });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

