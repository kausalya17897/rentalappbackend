const mongoose = require("mongoose");
function connection(){
    mongoose.connect('mongodb+srv://Kausalya:Welcome123@cluster0.8n5xp.mongodb.net/bikerental',{useUnifiedTopology:true,useNewUrlParser:true})

    const connection=mongoose.connection
    connection.on("connected",()=>{
        console.log("Mongodb connection successful")
    })

connection.on("error",()=>{
    console.log("Mongodb connection error")
})

}

connection()

module.exports=mongoose