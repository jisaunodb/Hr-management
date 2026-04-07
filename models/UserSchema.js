const mongoose = require('mongoose')

const {Schema} = mongoose

const userchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        // match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        min: [5, "to low"],
        max: [8, "to hight"]
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        //     "please enter a valid password"
        // ]
    },
    photo: {
        type: String
    },
    nid: {
        type: Number,
        min: [10, "to low"],
        max: [17, "to hight"]
    },
    address:{
        type: String
    },
    isLogin :{
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("User", userchema)