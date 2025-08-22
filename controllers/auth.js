const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const registration=async(req,res)=>{
    try{
        //get the user information
        const  {userEmail,userPassword,userName}=req.body
        if(!userEmail || !userPassword || !userName){
            return res.status(400).json({
                message:"You have missing information"
            })
        }

        //verify if the user already exist
        const isExistUser =await User.findOne({email:userEmail})
        if(isExistUser){
            return res.status(400).json({message:"email already has been taken !"})
        }

        //add to bd
        const encyptedPassword=await bcrypt.hash(userPassword,12)
        const newUser=new User({
            name:userName,
            email:userEmail,
            password:encyptedPassword
        })
        await newUser.save()
        //send the response
        res.status(201).json({message:"user has been created successfulls",user:newUser})


    }catch(error){
        res.status(500).json({messaage:"Something went wrong"})
    }
}
const Login=async(req,res)=>{
    try{
        //ndiw password et email 
         const  {userEmail,userPassword}=req.body

         if(!userEmail || !userPassword){
            return res.status(400).json({
                message:"missing data"
            })
        }
        const user=await User.findOne({
            email:userEmail

        })
        if(!user){
            return res.status(404).json({
                message:"invalid credentials"
            })
        }
        const isValidPass=await bcrypt.compare(userPassword,user.password)
        if(!isValidPass){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }
        user.password=undefined
        const token=jwt.sign({
            email:user.email,
            id:user._id,
            Role:user.Role
        },process.env.JWT_SECRET,{
            expiresIn:"1h"
        })
        res.status(200).json({
            message:"Loged  succesfully",
            user:user,
            token:token
        })
    }catch(error){
        console.log(error.message)
    }
}
module.exports={
    registration,
    Login,
}