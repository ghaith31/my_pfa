import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: string,
        required: true,
        unique: true
    },
    password: {
        type: string,
        required: true,
    },
    email: {
        type: string,
        required: true,
        unique: true
    }    
},

{timestamps: true}

);
const User = mongoose.model('User, UserSchema');
export default User;
