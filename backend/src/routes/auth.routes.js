const express=require('express')
const router=express.Router()
const authcontroller=require('../controller/auth.controller.js')

router.post('/register',authcontroller.userRegistration)
router.post('/signup',authcontroller.userSignup)




module.exports=router