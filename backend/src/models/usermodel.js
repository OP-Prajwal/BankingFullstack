const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const user=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:[true,"the email is alredy taken"]
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        minlength:6,
        required:true
    }
},{timestamps:true})

user.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }

    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
    next()

})
user.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}



const User=mongoose.model('User',user)

module.exports=User