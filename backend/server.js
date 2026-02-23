const app=require('./src/app.js')
const dotenv=require('dotenv')
dotenv.config()
const dbConnection=require('./src/config/db.js')
app.listen(3000,()=>{
    console.log("server is running in 3000")
})

dbConnection.connection()
