const Todo=require("../models/Todo")
const getAllTodos=async(req,res)=>{
    try{
    console.log("inside /todos")
    const todos=await Todo.find().populate("user",{name:1,email:1,_id:0
    })
    res.json({message:"todos list",data:todos})
    }catch(error){
        res.status(500).json({
            message:error. message
        })

    }
}
const createTodo=async(req,res)=>{
try{
   
    const newTodo=new Todo({
    name:req.body.name,
    user:req.user.id
})
await newTodo.save()
const todos=await Todo.find()

res.json({message:"Todo has been created succesfylyy",todos:todos})
}catch(error){
    res.status(500).json({
        message:error.message
    })
}
}
const getTodoDetails=async(req,res)=>{
  try{
     const todo=await Todo.findOne(
    {
        _id:req.params.id
    }
   ).populate("user",{name:1})
  

    res.json({message:"Todo details",user:todo })

  }catch(error){
    res.status(500).json({
        message:error.message
    })
  }
}
const updateTodo=async(req,res)=>{
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
}
const deleteTodo=async(req,res)=>{
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
}
module.exports={
    getAllTodos,
    createTodo,
    getTodoDetails,
    updateTodo,
    deleteTodo
}