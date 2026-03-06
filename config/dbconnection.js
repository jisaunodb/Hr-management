const mongoose = require('mongoose')

let dbconnection = () =>{
    mongoose.connect(
    process.env.DB_URL,
).then(()=>{
    console.log("database connected");

})
}

module.exports = dbconnection;