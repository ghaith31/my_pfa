import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';



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
app.use(cors());
const PORT = 7003;
app.use(express.json());
app.use(cookieParser());




app.listen(PORT, () => {    
    console.log(`Server is running on port  ${PORT}`);
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});  