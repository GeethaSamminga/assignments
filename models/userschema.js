const mongoose=require("mongoose");
const joi = require("joi")

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
     role:{
            type:String,
            enum: ['admin', 'user'],
            default:"user"
        }
},{ timestamps: true })
const User=mongoose.model("User",userSchema);

module.exports=User