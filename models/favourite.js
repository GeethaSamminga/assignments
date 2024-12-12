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
   
},{ timestamps: true })

const Favourite=mongoose.model("Favourite",addFavouriteSchema)

module.exports=Favourite