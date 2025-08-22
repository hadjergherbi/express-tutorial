const User=require("../models/User")
const userProfile=async(req,res)=>{
   try{
    const userId=req.user.id
    const connected=await User.findOne({_id:userId })
    connected.password=undefined
    res.status(200).json({
        messaage:"User details",user:connected
    })
   }catch(error){
    return res.status(400)
   }
}
module.exports=userProfile