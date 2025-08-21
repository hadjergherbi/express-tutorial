const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  name:{type:String,required:true},
  Role:{type:String,enum:["User","admin"],default:"User"}

})
module.exports=mongoose.model("User",userSchema)