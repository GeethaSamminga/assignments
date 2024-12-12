const Favourite = require("../models/favourite")
const Item = require("../models/fileschema")
const User = require("../models/userschema")
const mongoose=require("mongoose")
// add to favourite
const addFavourite=async(req,res)=>{
try{
    const{userId,itemId}=req.body
    if (!mongoose.Types.ObjectId.isValid(userId) || userId.length !== 24) {
        return res.status(400).json({ message: "Invalid userId" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(itemId) || itemId.length !== 24) {
        return res.status(400).json({ message: "Invalid itemId" });
      }

    if(!userId||!itemId){
        return res.status(400).json({message:"userId and itemId are required"})
    }
     const user=await User.findById({_id:userId})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
     
    const product=await Item.findById(itemId)
    if(!product){
        return res.status(404).json({message:"product not found"})
    }

    const existingFavourite=await Favourite.findOne({userId,itemId})

    if(existingFavourite){
        return res.status(400).json({message:"product is already in favourite"})
    }

    const favourite=new Favourite({userId,itemId})
    await favourite.save()
    res.status(201).json({message:"product add to favourite",favourite})
}
catch(error){
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: error.message });
}
}

// remove favourite

const removeFavourite = async (req, res) => {
    try {
        const {itemId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(itemId) || itemId !== 24) {
            return res.status(400).json({ message: "Invalid userId" });
          }
      
      
        if (!itemId) {
            return res.status(400).json({ message: "userId and itemId are required" });
        }

        const favourite = await Favourite.findOneAndDelete({_id:itemId });
        if (!favourite) {
            return res.status(404).json({ message: "Favorite item not found" });
        }

     

        res.status(200).json({ message: "Product removed from favourites" });
    } catch (error) {
        console.error("Error removing from favorites:", error);
        res.status(500).json({ error: error.message });
    }
};

// get all products in favourites
const allfavourites = async (req, res) => {
    try {
      
        const userId = req.user.id;

      
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

      
        const addfavouriteProducts = await Favourite.find({ userId }).populate("itemId");
        
        if (!addfavouriteProducts || addfavouriteProducts.length === 0) {
            return res.status(404).json({ message: "No products found in favourites" });
        }

        res.status(200).json({
            message: "Fetched user's favourites successfully",
            favourites: addfavouriteProducts
        });
    } catch (error) {
        console.error("Error fetching favourites:", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports={addFavourite,removeFavourite,allfavourites}