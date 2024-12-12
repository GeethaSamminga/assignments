const AddCart = require("../models/cartschema")
const Item = require("../models/fileschema")

// add to favourite
const addCart=async(req,res)=>{
try{
    const{itemId}=req.body
    
    if(!itemId){
        return res.status(400).json({message:"itemId are required"})
    }

    const product=await Item.findById(itemId)
    if(!product){
        return res.status(404).json({message:"product not found"})
    }

    const existingAddcart=await AddCart.findOne({itemId})
 console.log(existingAddcart)
    if(existingAddcart){
        return res.status(400).json({message:"product is already in cart"})
        // existingAddcart.quantity+=quantity
    }

    const addcart=new AddCart({itemId})
    await addcart.save()
    res.status(201).json({message:"product add to cart",addcart})
}
catch(error){
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: error.message });
}
}


// remove favourite

const removeCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

      
        if (!userId || !itemId) {
            return res.status(400).json({ message: "userId and itemId are required" });
        }

        const addcart = await AddCart.findOne({ userId, itemId });
        if (!addcart) {
            return res.status(404).json({ message: "cart item not found" });
        }

        await AddCart.deleteOne({ userId, itemId });

        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ error: error.message });
    }
};

// get all products in cart

const allAddCart=async(req,res)=>{
    try{

        const{memberId}=req.user.id

        const addcartProducts=await AddCart.find({memberId});

        if(addcartProducts.length==0||!addcartProducts){
         const message=addcartProducts.length==0 ? "no products are in the cart":"no cart found for this user";
         res.status(400).json({message:message})
        }

        res.status(200).json({message:"get cart item successfully",addcartProducts});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports={addCart,removeCart,allAddCart}