const mongoose=require("mongoose")
const TodoSchema =new mongoose.Schema({
    name:String,
    CreatedAt:{type:Date,default:new Date()},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}

})
module.exports =mongoose.model("Todo",TodoSchema)