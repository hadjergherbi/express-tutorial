const express=require("express")
const router=express.Router()
const authMiddleware=require("../middlewares/authMiddleware")
const adminMiddleware =require("../middlewares/adminMiddleware")
const { getAllTodos, createTodo, getTodoDetails, updateTodo, deleteTodo } = require("../controllers/todos")


router.get("/",authMiddleware,getAllTodos)
router.post("/",authMiddleware,adminMiddleware,createTodo)
router.get("/:id",getTodoDetails)
router.put("/:id",updateTodo)
router.delete("/:id",deleteTodo)
module.exports=router