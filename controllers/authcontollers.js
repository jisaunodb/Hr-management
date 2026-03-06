const mongoose = require('mongoose')
const User = require('../models/UserSchema.js')
const bcrypt = require("bcryptjs")

let registrationControllers = async (req, res) =>{

    const {username,email,password} = req.body
    // console.log(username, email ,password);

    // check existing user

    try {
        let existingUser = await User.findOne({email: email})

    if(existingUser){
        return res.status(400).json({
            success: false,
            massage: "email allready exists"
        })
    }


    bcrypt.hash(password, 10, async function (err, hash) {
        if(err){
            return res.status(500).json({
            success: false,
            massage: "server error"
        })
        }
        console.log(hash);

         // user create
        let createuser = await new User({
        username: username,
        email: email,
        password: hash
    }).save()

    res.send({
        id:createuser._id,
        username: createuser.username,
        email:createuser.email,

    })

    })


    // const hash = await bcrypt.hash(password, 10)
    // let createuser = await new User({
    //     username: username,
    //     email: email,
    //     password: hash
    // }).save()

    // res.send({
    //     id:createuser._id,
    //     username: createuser.username,
    //     email:createuser.email,
    //     // password: createuser.password
    // })
    // res.send("hello world")




    } catch (error) {
        console.log(error)
            return res.status(500).json({
            success: false,
            massage: "server Error"
        })
    }



}

module.exports = {registrationControllers}