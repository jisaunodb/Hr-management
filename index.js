require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbconnection = require('./config/dbconnection')
const { registrationControllers, logincontroller, logoutcontroller, logoutcontoller } = require('./controllers/authcontollers')
const { profilecreatecontroller, getprofile } = require('./controllers/profilecreatecontroller')

app.use(express.json());
dbconnection();

app.get('/',(req,res)=>{
    res.send("hey developers")
})
app.post('/registration', registrationControllers )

app.post('/login', logincontroller)
app.post('/logout', logoutcontroller)

// profile create
app.post('/profilecreate', profilecreatecontroller)
app.get('/getprofile', getprofile)





console.log(process.env.PORT);

const port = process.env.PORT || 6000;
//mongodb+srv://Hr-management:SIqt3z6cFAR4ytb7>@cluster0.le7bphi.mongodb.net/?appName=Cluster0

app.listen(6000,()=>{
    console.log(`server running ${port}`);

})