const jwt=require("jsonwebtoken")
const adminMiddleware=(req,res,next)=>{
try{
    console.log(req.user)
    if(req.user.Role !== "admin"){
        return  res.status(401).json({
             message:"Unauthorized"
    })
    }
    next()
}catch(error){
    res.status(401).json({
        message:"Unauthorized"
    })
}
} 
module.exports=adminMiddleware