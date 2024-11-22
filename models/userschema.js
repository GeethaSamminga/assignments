const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    required:true,
    },
    email:{
        type:String,
        unique:true
        },
    password:{
         type:String,
         required:true
            },
    phone:{
        type:Number,
        unique:true
        },
     role:{
            type:String,
            enum: ['admin', 'user'],
            default:"user"
        }
})
const User=mongoose.model("User",userSchema);

module.exports=User