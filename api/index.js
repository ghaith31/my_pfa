import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose
  .connect("mongodb+srv://libery:libery@libery.rh2fcjr.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
  console.log('MongoDB Connected');
})
.catch((err) => {
  console.log(err);
});

const app = express();

app.listen(3000, () => {    
    console.log('Server is running on port 30000');
}    
);