import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
  console.log('MongoDB Connected');
})
.catch((err) => {
  console.log(err);
});

const app = express();
const PORT = 5000;
app.use(express.json());

app.listen(PORT, () => {    
    console.log(`Server is running on port  ${PORT}`);
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);