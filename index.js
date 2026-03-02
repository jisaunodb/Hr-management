require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.get('/',(req,res)=>{
    res.send("hey developers")
})
app.use(express.json());

mongoose.connect(
    process.env.DB_URL,
).then(()=>{
    console.log("connected mongodb");

})

console.log(process.env.PORT);

const port = process.env.PORT || 6000;
//mongodb+srv://Hr-management:SIqt3z6cFAR4ytb7>@cluster0.le7bphi.mongodb.net/?appName=Cluster0

app.listen(6000,()=>{
    console.log(`server running ${port}`);

})