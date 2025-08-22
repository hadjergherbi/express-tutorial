require("dotenv").config()
const express =require("express")
const mongoose=require("mongoose")
const cors =require("cors")
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



mongoose.connect(process.env.DATABASE_URL,
    {serverSelectionTimeoutMS:5000}
).then(()=>{
app.listen(5000,()=>{
    console.log("the server is starting")
}) 
}).catch((err)=>{
    console.log(err)
})

