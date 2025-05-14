import Question from "../models/questionModel.js";
//import Answer from "../models/answerModel.js";
import userProgress from "../models/userProgress.js";
import ApiError from '../utils/apiError.js';

// Helper to get question by order with answers
export const getQuestions = async (req,res) => {
  try {
    const questions = await Question.find();

    if (!questions) {
      throw new Error("Question not found");
    }
    res.status(200).json({questions})

  } catch (error) {
    console.error("Error in getQuestions:", error.message);
    throw error;
  }
};

// export const getQuestion = async (req, res) => {
//   try {
//     const questionId = req.params.id;

//     const question = await Question.findById(questionId)
//       .populate('answers', 'text leadsToConfirmation confirmationImage nextQuestionId');

//     if (!question) {
//       return res.status(404).json({ error: "Question not found" });
//     }

//     res.status(200).json({ question });

//   } catch (error) {
//     console.error("Error in getQuestion:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


export const getFirstQuestion = async (req, res) => {
  try {
    const question = await getQuestionWithAnswers(1);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNextQuestion = async (req, res) => {
  try {
    const  answerIds  = req.params.id;
    
    // Handle single answer flow
    if (!Array.isArray(answerIds)) {
      const answer = await Answer.findById(answerIds);
      
      if (answer.leadsToConfirmation) {
        const confirmationQuestion = await Question.findOne({ order: 2 });
        const confirmationAnswers = await Answer.find({ questionId: confirmationQuestion._id });
        
        return res.json({
          ...confirmationQuestion.toObject(),
          answers: confirmationAnswers,
          confirmationImage: answer.confirmationImage
        });
      }
      
      const nextQuestion = await getQuestionWithAnswers(
        (await Question.findById(answer.nextQuestionId)).order
      );
      return res.json(nextQuestion);
    }
    
    // Handle multi-choice questions
    const currentQuestion = await Question.findById(req.params.questionId);
    
    if (currentQuestion.order === 4) {
      return res.json(await getQuestionWithAnswers(5));
    }
    
    if (currentQuestion.order === 5) {
      return res.json(await getQuestionWithAnswers(6));
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const addQuestion = async(req,res) =>{
  const question = await Question.create(req.body)
  res.status(200).json({success : true, data: question})
};


export const currentQuestion = async (req, res) => {
  const progress = await userProgress.findOne({ userId: req.params.userId });
  const order = progress?.currentQuestionOrder || 1;

  // const order = progress?userProgress.currentQuestionOrder || 1;

  const question = await Question.findOne({ order });
  if (!question) return res.status(404).json({ message: 'No question found' });

  res.json({ question });
};

export const selectAnswer =  async (req, res) => {
  const { userId, answerText } = req.body;

  const progress = await userProgress.findOne({ userId });
  if (!progress) return res.status(404).json({ message: 'Progress not found' });

  const question = await Question.findOne({ order: progress.currentQuestionOrder });

  const selectedAnswer = question.answer.find(ans => ans.text === answerText);
  if (!selectedAnswer) return res.status(400).json({ message: 'Invalid answer' });

  // نحفظ الإجابة المؤقتة
  progress.selectedAnswer = answerText;
  progress.isConfirmed = false;
  await progress.save();

  res.json({
    image: selectedAnswer.image,
    confirmQuestion:  'Are you sure your skin texture is similar to this picture? '
  });
};
