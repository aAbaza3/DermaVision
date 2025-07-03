import express  from 'express'
import dotenv  from 'dotenv/config'
import connectDb from './config/db.js'
import auth from'./routes/authRoute.js'
import questionRoute from './routes/questionRoute.js';
import answerRoutes from './routes/answerRoutes.js';
import scanRoutes from './routes/scanRoutes.js';
import cors from "cors";

connectDb();
const app = express()

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/questions', questionRoute);
app.use('/api/v1/scans', scanRoutes);
app.use('/api/v1/answers', answerRoutes);

import globalErrorHandler from './middleware/errorMiddleware.js';
app.use(globalErrorHandler);


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server Running on port ${port}!`))

// process.on('unhandledRejection',(err)=>{
//     console.log(`Unhandled Rejection Error: ${err}`);
//     server.close(()=>{
//         console.error('Server is closing...');
//         process.exit(1);
//     });// Exit process if unhanded rejection error occurs
// })
