import questions from './data/questions.js'; // داتا الاسئلة
import Question from './models/questionModel.js';
//import Answer from './models/answerModel.js';
import connectDb from './config/db.js';

const importData = async () => {
  try {
    await connectDb();

    // أولاً امسح أي داتا قديمة
    await Question.deleteMany();
    // await Answer.deleteMany();

    // بعدها دخل الأسئلة
    const createdQuestions = await Question.insertMany(questions);


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