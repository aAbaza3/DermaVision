import Answer from  '../models/Answer.js'
import User from '../models/user.js'


// To Save Answers with userid and quations
export const submitAnswers = async (req, res) => {
  try {
    const { userid, answers } = req.body;
     console.log("Received user ID:", userid);
     console.log("Full body:", req.body);

    const user = await User.findById(userid);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const savedAnswers = await Promise.all(
      answers.map(async (ans) => {
        const newAnswer = new Answer({
          user: userid,
          question: ans.questionId,
          answer: ans.answer 
        });
        return await newAnswer.save();
      })
    );
  



    res.status(201).json(savedAnswers);
  } catch (err) {
    console.error("Error in submitAnswers:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
