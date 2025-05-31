const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, "First name is required"] 
    },
    lastName: { 
        type: String, 
        required: [true, "Last name is required"]
    },
    username: { 
        type: String, 
        required: [true, "Username is required"], 
        unique: true
    },
    email: { 
        type: String, 
        required: [true, "Email is required"],
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, "Password is required"]
    },
    profilePicture: { 
        type: String, 
        default: ""
    },
    joinedAt: { 
        type: Date, 
        default: Date.now 
    }
}, {versionKey: false});

module.exports = mongoose.model("User", userSchema);