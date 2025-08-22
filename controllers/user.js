const User=require("../models/User")
const userProfile=async(req,res)=>{
   try{
    const userId=req.user.id
    const connected=await User.findOne({_id:userId }).populate("todos",{name:1,_id:0,CreatedAt:1})
    connected.password=undefined
    res.status(200).json({
        messaage:"User details",user:connected
    })
   }catch(error){
    return res.status(400)
   }
}
module.exports=userProfile