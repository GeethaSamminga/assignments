const mongoose=require("mongoose")

const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"assignments"
    })
    .then(()=>{
        console.log("databse is connected")
    })
    .catch((err)=>{
     console.log("databse connection is failed")
    })
}

module.exports=connectDB