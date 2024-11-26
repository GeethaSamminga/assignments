const Favourite = require("../models/favourite")
const Item = require("../models/fileschema")

// add to favourite
const addFavourite=async(req,res)=>{
try{
    const{userId,itemId}=req.body
    if(!userId||!itemId){
        return res.status(400).json({message:"userId and itemId are required"})
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
        const { userId, itemId } = req.body;

      
        if (!userId || !itemId) {
            return res.status(400).json({ message: "userId and itemId are required" });
        }

        const favourite = await Favourite.findOne({ userId, itemId });
        if (!favourite) {
            return res.status(404).json({ message: "Favorite item not found" });
        }

        await Favourite.deleteOne({ userId, itemId });

        res.status(200).json({ message: "Product removed from favourites" });
    } catch (error) {
        console.error("Error removing from favorites:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports={addFavourite,removeFavourite}