const express=require("express")
const router=express.Router()
const authMiddleware=require("../middlewares/authMiddleware")
const userProfile = require("../controllers/user")

router.get("/profil",authMiddleware,userProfile)
module.exports=router