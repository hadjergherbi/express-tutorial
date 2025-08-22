const express=require("express")
const { registration, Login } = require("../controllers/auth")
const router =express.Router()


router.post("/register",registration)
router.post("/login",Login)
module.exports=router