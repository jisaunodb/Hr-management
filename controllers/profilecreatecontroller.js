const profilecreateSchema = require("../models/profilecreateSchema");
const Profile = require('../models/profilecreateSchema')
let profilecreatecontroller = async (req,res)=>{
    console.log("hello");
    let {employeeId,email,name,phoneNumber,bloodGroup,gender,dob,designation} = req.body

    let existingUser = await Profile.findOne({email: email});

    if(existingUser){
        return res.status(400).json({
            success: false,
            massage: "email allready used"
        })
    }

     let firsttreeletter = name.slice(0,3)
    let rendomId = Date.now().toString()
    let emId = firsttreeletter+rendomId.slice(-3)
    console.log(rendomId);
    console.log(emId);

    let existingUsers = await Profile.findOne({employeeId: emId});

    if(existingUsers){
        return res.status(400).json({
            success: false,
            massage: "this Id allready used"
        })
    }





    let profile = new profilecreateSchema({
        employeeId : emId,
        email,
        name,
        phoneNumber,
        bloodGroup,
        gender,
        dob,
        designation
    })
    profile.save()
    res.status(200).json({
        success: true,
        success: "profile created"

    })


}
let getprofile = async (req,res)=>{

    let data = await Profile.find({})
    res.status(200).json({
        success: true,
        massage: "all profile data",
        data: data
    })
}
module.exports={profilecreatecontroller,getprofile}