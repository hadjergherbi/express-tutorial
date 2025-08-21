const express =require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const Todo=require('./models/Todo')
const User=require('./models/User')
const jwt=require("jsonwebtoken")
const cors =require("cors")
const authMiddleware=require("./middlewares/authMiddleware")
const adminMiddleware=require("./middlewares/adminMiddleware")
//create the server


const app=express()
let corsoptions={
    origin:["http://localhost:5173"]
}
app.use(cors(corsoptions))
app.use(express.json())//midlle ware use 
app.get("/Todos",authMiddleware,async(req,res)=>{
    try{
    console.log("inside /todos")
    const todos=await Todo.find()
    res.json({message:"todos list",data:todos})
    }catch(error){
        res.status(500).json({
            message:error. message
        })

    }
})
//create new todos
app.post("/Todos",authMiddleware,adminMiddleware,async(req,res)=>{
try{
   
     console.log("Post todos ",req.user.email)
    const newTodo=new Todo({
    name:req.body.name,
    CreatedBy:req.user.email
})
await newTodo.save()
const todos=await Todo.find()

res.json({message:"Todo has been created succesfylyy",todos:todos})
}catch(error){
    res.status(500).json({
        message:error.message
    })
}
})
app.get("/Todos/:id",async(req,res)=>{
  try{
     const todo=await Todo.findOne(
    {
        _id:req.params.id
    }
   )
  

    res.json({message:"Todo details",user:todo })

  }catch(error){
    res.status(500).json({
        message:error.message
    })
  }
})
// app.put("/users/:id",(req,res)=>{
//     const userId=Number(req.params.id)
//     const user=users.find((u)=>u.id===userId)
//    if(!user){
//     res.json({message:"User not found"})
//    }
//    if(req.body.name){
//     user.name=req.body.name
//    }
//    res.json({
//     message:"User has been updated",
//     users:user
//    })
app.put("/Todos/:id",async(req,res)=>{
    // const userId=Number(req.params.id)
    // const user=users.findIndex((item)=>item.id === userId)
    // if(user===-1){
    //     return res.status(404).json({message:"user not found"})
    // }
    // users[user].name=req.body.name
   try{
     const todo= await Todo.findOne({
        _id:req.params.id
    })
    if (!todo){
        return res.status(404).json({
            message:"Todo not found"
        })
    }
    const updatedTodo=await Todo.updateOne({
        _id:todo.id
    },{
        name:req.body.name
    })
 
    

    res.status(204).json({message:"todo has been updated",todo:updatedTodo})

   }catch(error){
    res.status(500).json({
        message:error.message

    })
   }
})

// })

// app.delete("/users/:id",(req,res)=>{
//      const userId=Number(req.params.id)
//     const user=users.findIndex((u)=>u.id===userId)
//       if(user===-1){
//     res.json({message:"User not found"})
//    }
//    users.splice(user,1)
  
//      res.json({
//     message:"User has been deleted",
//     users:users
//    })

// })
app.delete("/Todos/:id", async(req,res)=>{
 const todo=await Todo.findOne(
    {
        _id:req.params.id
    }
   )   
   if(!todo){
    return res.status(404).json({
        message:"todo does not exist "
    })  
   } 
   await Todo.deleteOne({_id:req.params.id})
   const newTodos =await Todo.find()
   
    res.json({
        message:"Todo has been deleted ",})
})
app.post("/register",async(req,res)=>{
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
})
app.post("/login",async(req,res)=>{
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
        },"Secret_JWT",{
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
})
app.get("/profil",authMiddleware,async(req,res)=>{
   try{
    const userId=req.user.id
    const connected=await User.findOne({_id:userId })
    res.status(200).json({
        messaage:"User details",user:connected
    })
   }catch(error){
    return res.status(400)
   }
})

mongoose.connect("mongodb://localhost:27017/todos-App",
    {serverSelectionTimeoutMS:5000}
).then(()=>{
app.listen(5000,()=>{
    console.log("the server is starting")
}) 
}).catch((err)=>{
    console.log(err)
})

