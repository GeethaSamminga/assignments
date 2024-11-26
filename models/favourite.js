const mongoose=require("mongoose")

const addFavouriteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:true,
    },
    addedAt:{
        type:Date,
        default:Date.now()
    }
})

const Favourite=mongoose.model("Favourite",addFavouriteSchema)

module.exports=Favourite