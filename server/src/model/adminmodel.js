const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    fname :{
        type:String,
        required:true

    }
})