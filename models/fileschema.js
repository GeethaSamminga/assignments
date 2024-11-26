const mongoose=require("mongoose")

const itemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
    },
    cost:{
        type:Number
    },
    quantity:{
        type:Number,
        required:true
    }
})

const Item= mongoose.model("Item",itemSchema)

module.exports=Item