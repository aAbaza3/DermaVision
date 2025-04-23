import express  from 'express'
import dotenv  from 'dotenv/config'
import connectDb from './config/db.js'
import auth from'./routes/authRoute.js'

connectDb();
const app = express()
app.use(express.json());
app.use('/api/v1/auth', auth);
const port = 8080 || process.env.PORT 

app.listen(port, () => console.log(`Server Running on port ${port}!`))

// process.on('unhandledRejection',(err)=>{
//     console.log(`Unhandled Rejection Error: ${err}`);
//     server.close(()=>{
//         console.error('Server is closing...');
//         process.exit(1);
//     });// Exit process if unhanded rejection error occurs
// })
