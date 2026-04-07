const mongoose = require("mongoose")

let {Schema} = mongoose

let profilecreate = new Schema({
    employeeId:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name:{
        type: String,
        required: true,

    },
    phoneNumber:{
        type: String,
        required: true,

    },
    bloodGroup:{
        type: String

    },
    gender:{
        type: String,
        enum:["male","female","custom"]

    },
    dob:{
        type: String,
        required: true

    },
    designation:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Profile",profilecreate)
