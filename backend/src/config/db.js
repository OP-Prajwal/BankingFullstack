const mongoose=require('mongoose')

async function connection() {

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>
    {
        console.log("mongo connected ")
    })
    .catch((err)=>{
        console.log("error occoured ",err)

        process.exit(1)
    })

    
}

module.exports={connection}



