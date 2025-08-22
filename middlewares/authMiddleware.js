const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
try{
    console.log("middleware")
let token=req.headers.authorization
if(token){
    token=token.split(" ")[1]
   const decodedToken= jwt.verify(token,process.env.JWT_SECRET)
   req.user=decodedToken
   next()
}else{
      res.status(401).json({
        message:"Unauthorized"
    })

}
}catch(error){
    res.status(401).json({
        message:"Unauthorized"
    })
}
} 
module.exports=authMiddleware