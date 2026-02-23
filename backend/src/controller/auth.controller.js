

const userModel=require("../models/usermodel.js")
const jwt=require("jsonwebtoken")

async function userRegistration(req,res){

    const {email,name,password}=req.body

    if(!email || !name || !password){
        return res.status(401).json({message:"give all details "})
    }

    try{
         const response=await userModel.create({
            email,name,password
         })

         const token=jwt.sign({userid:response._id},process.env.JWT_SECRET,{
            expiresIn:"3d"
         })

         if(!response)   return res.status(401).json({message:"failed while creating  "})
          res.cookies("token",token)
            return res.status(200).json({
                user:{
                    _id:response._id,
                    email:response.email,
                    name:response.name
                },
                token
            })
        }catch(err){
         
        return res.status(501).json({message:"failed"})
    }
}


async function userSignup(req,res){
    const {email,password}=req.body
    if(!email || !password){
        return res.status(401).json({message:"give all details "})
    }
  try{
      const user=await userModel.findOne({email})
    if(!user)  return res.status(401).json({message:"user not found"})
    
    const ispasswordLegit=await user.comparePassword(password)
    if(!ispasswordLegit) return res.status(401).json({message:"password is not correct"})
   const token=jwt.sign({userid:user._id},process.env.JWT_SECRET,{
            expiresIn:"3d"
         })
        res.cookies("token",token)
            return res.status(200).json({
                user:{
                    _id:user._id,
                    email:user.email,
                    name:user.name
                },
                token
            })
  }catch(err){
    console.log(err)
    
  }
    
    
    
    }




module.exports={
    userRegistration,userSignup
}