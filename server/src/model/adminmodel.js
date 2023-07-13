const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const adminSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    userId :{
        type:objectId,
        required:true,
        ref:"user"
    },
    isDeleted:{
        default:false,
        type:Boolean
    }

},{timestamps:true})

module.exports= mongoose.model('admin',adminSchema)