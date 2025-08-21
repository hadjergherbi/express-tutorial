const mongoose=require("mongoose")
const TodoSchema =new mongoose.Schema({
    name:String,
    CreatedBy:String

})
module.exports =mongoose.model("Todo",TodoSchema)