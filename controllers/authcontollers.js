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


    let hash;
    try{

        // const hash = bcrypt.hashSync(password, 10)
         hash = bcrypt.hashSync(password, 10)
    } catch(err){
         return res.status(500).json({
        message: "Password failed"
        })
    }



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
    console.log(hash);


    // bcrypt.hash(password, 10, async function (err, hash) {
    //     if(err){
    //         return res.status(500).json({
    //         success: false,
    //         massage: "server error"
    //     })
    //     }
    //     console.log(hash);

    //      // user create
    //     let createuser = await new User({
    //     username: username,
    //     email: email,
    //     password: hash
    // }).save()

    // res.send({
    //     id:createuser._id,
    //     username: createuser.username,
    //     email:createuser.email,

    // })

    // })


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

let logincontroller = async (req,res)=>{
    let {email,password} = req.body


    // email check

    let existingUser = await User.findOne({email: email})

    if(existingUser.isLogin){
        return res.status(404).json({
            success: false,
            massage: "please logout for another device"
        })
    }

    // res.send(existingUser)

    if(!existingUser){
        return res.status(404).json({
            success: false,
            massage: "email not found"
        })
    }

    // pass check

  let pass =  bcrypt.compareSync(password, existingUser.password);
  console.log(pass);

  if(pass){
    existingUser.isLogin = true;
    existingUser.save()
    res.status(200).json({

        success: true,
        massage: "Login successfull"
    })
  }else{
    res.status(200).json({
        success: false,
        massage: "Invalid Credential"
    })
  }

}

// let logoutcontroller = async (req,res)=>{
//     let {id} =req.body
//     let existingUser = await User.findOne({_id: id})
//     existingUser.isLogin = false;
//     existingUser.save()

//     res.status(200).json({
//         success: true,
//         massage: "Logout success"
//     })

// }
let logoutcontroller = async (req,res) =>{
    let {id} = req.body

    let existingUser = await User.findOne({_id: id})

    existingUser.isLogin = false;
    existingUser.save()
    res.status(200).json({
        success: true,
        massage: "logout success"
    })

}

module.exports = {registrationControllers,logincontroller,logoutcontroller}