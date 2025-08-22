const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  name:{type:String,required:true},
  Role:{type:String,enum:["User","admin"],default:"User"},
 

})
//connect the user with todos by creatinn=g virtual populate
userSchema.virtual("todos",{
  ref:"Todo",
  localField:"_id",
  foreignField:"user"
})
//ensure virtuals are included in json output
userSchema.set("toObject",{virtuals:true})
userSchema.set("toJSON",{virtuals:true})
module.exports=mongoose.model("User",userSchema)