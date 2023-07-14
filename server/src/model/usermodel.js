const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model('user',userSchema)