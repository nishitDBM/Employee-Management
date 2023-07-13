const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const perfomanceSchema = new mongoose.Schema({
    performId :{
        type:objectId,
        required:true,
        ref:"admin"
    },
    content:{
        type:String,
        required:true
    }

})

module.exports= mongoose.model('perfomance',perfomanceSchema)