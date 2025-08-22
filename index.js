const express =require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const Todo=require('./models/Todo')
const User=require('./models/User')
const jwt=require("jsonwebtoken")
const cors =require("cors")
const authMiddleware=require("./middlewares/authMiddleware")
const adminMiddleware=require("./middlewares/adminMiddleware")
const todosRoutes=require("./routes/todos.routes")
const authRoutes=require("./routes/auth.routes")
const userRoutes=require("./routes/user.routes")
//create the server


const app=express()
let corsoptions={
    origin:["http://localhost:5173"]
}
app.use(cors(corsoptions))
app.use(express.json())//midlle ware use 
app.use("/Todos",todosRoutes)
app.use("/auth",authRoutes)
app.use("",userRoutes)



mongoose.connect("mongodb://localhost:27017/todos-App",
    {serverSelectionTimeoutMS:5000}
).then(()=>{
app.listen(5000,()=>{
    console.log("the server is starting")
}) 
}).catch((err)=>{
    console.log(err)
})

