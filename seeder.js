import questions from './data/questions.js'; // داتا الاسئلة
import Question from './models/questionModel.js';
// import Answer from './models/answerModel.js';
import connectDb from './config/db.js';

const importData = async () => {
  try {
    await connectDb();

    // أولاً امسح أي داتا قديمة
    await Question.deleteMany();
    // await Answer.deleteMany();

    // بعدها دخل الأسئلة
    const createdQuestions = await Question.insertMany(questions);

//     // جهز الإجابات مع ربط كل إجابة بالسؤال الصح
//     const answers = [
//         { 
//             text: "Oily", 
//             questionId: '680e83639c172446b997347f', 
//             leadsToConfirmation: true,
//             // confirmationImage: "/images/skin-types/oily.jpg" 
//           },
//           { 
//             text: "Dry", 
//             questionId: '680e83639c172446b997347f', 
//             leadsToConfirmation: true,
//             // confirmationImage: "/images/skin-types/dry.jpg" 
//           },
//           { 
//             text: "Normal", 
//             questionId: '680e83639c172446b997347f', 
//             leadsToConfirmation: true,
//             // confirmationImage: "/images/skin-types/normal.jpg" 
//           },
//           { 
//             text: "Combination", 
//             questionId: '680e83639c172446b997347f', 
//             leadsToConfirmation: true,
//            // confirmationImage: "/images/skin-types/combination.jpg" 
//           },
          
//           // Q2 Answers
//           { 
//             text: "Yes", 
//             questionId: '680e83639c172446b9973480', 
//             nextQuestionId: '680e83639c172446b9973481' 
//           },
//           { 
//             text: "Cancel", 
//             questionId: '680e83639c172446b9973480', 
//             nextQuestionId: '680e83639c172446b997347f' 
//           },
          
    
//            // Q3 Answers
//            {
//             text: "Not sensitive",
//             questionId: '680e83639c172446b9973481',
//             nextQuestionId: '680e83639c172446b9973482' 
//            },
//            { 
//             text: "Slightly sensitive",
//             questionId: '680e83639c172446b9973481', 
//             nextQuestionId: '680e83639c172446b9973482' 
//            },
//            { 
//             text: "Very sensitive",
//             questionId: '680e83639c172446b9973481', 
//             nextQuestionId: '680e83639c172446b9973482' 
//            },
           
    
//            // Q4 Answers (multi-choice)
//            {
//             text: "Sun", 
//             questionId: '680e83639c172446b9973482',
//             nextQuestionId: '680e83639c172446b9973483' 
//            },
//            { 
//             text: "Pollution",
//             questionId: '680e83639c172446b9973482',
//             nextQuestionId: '680e83639c172446b9973483' 
//            },
//            {
//             text: "Indoor environments", 
//             questionId: '680e83639c172446b9973482' ,
//             nextQuestionId: '680e83639c172446b9973483' 
//            },
           
    
//            // Q5 Answers (multi-choice)
//            { 
//             text: "Acne",
//             questionId: '680e83639c172446b9973483',
//             nextQuestionId: '680e83639c172446b9973484' 
//            },
//            { 
//             text: "Wrinkles", 
//             questionId: '680e83639c172446b9973483' ,
//             nextQuestionId: '680e83639c172446b9973484' 

//            },
//            { 
//             text: "Pigmentation", 
//             questionId: '680e83639c172446b9973483' ,
//             nextQuestionId: '680e83639c172446b9973484' 
//            },
//            { 
//             text: "Dullness", 
//             questionId: '680e83639c172446b9973483',
//             nextQuestionId: '680e83639c172446b9973484' 
//            },
//            {
//             text: "Redness",
//             questionId: '680e83639c172446b9973483',
//             nextQuestionId: '680e83639c172446b9973484' 
//            },
//            { 
//             text: "Dryness", 
//             questionId: '680e83639c172446b9973483' ,
//             nextQuestionId: '680e83639c172446b9973484' 
//            },
           
    
//            // Q6 Answers
//            { 
//             text: "Yes, confirm", 
//             questionId: '680e83639c172446b9973484'
//          }, // End of flow
//            { 
//             text: "No, let me review", 
//             questionId: '680e83639c172446b9973484', 
//             nextQuestionId: '680e83639c172446b997347f' 
//         }
//     ];

//     // دخل الإجابات
//     await Answer.insertMany(answers);

    console.log('Data Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDb();
    await Question.deleteMany();
    //await Answer.deleteMany();
    console.log('Data Destroyed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

// تشغيل حسب البراميتر اللي بتبعته
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}