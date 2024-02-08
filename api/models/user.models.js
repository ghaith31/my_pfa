import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
     avatar:{
      type: String,
      default: "https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/424605098_374468085288772_789846587360243535_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_ohc=t17s1WKFfvMAX90XsjQ&_nc_ht=scontent.ftun9-1.fna&oh=00_AfAJFcFk1ALFOl55CtWSQGkbzFQvpp95jsyaFCEW-HQSOA&oe=65C9678A"
    }
},

{timestamps: true}

);
const User = mongoose.model('User', userSchema);
export default User;
