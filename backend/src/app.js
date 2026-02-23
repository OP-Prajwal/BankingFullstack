const express=require('express')
const cookieparser=require('cookie-parser')
const app=express()
app.use(express.json())
app.use(cookieparser())
const authRouter=require("../src/routes/auth.routes.js")
module.exports=app


app.use('/api/auth',authRouter)


