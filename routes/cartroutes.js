const express=require("express");
const{addCart,removeCart,allAddCart}=require("../controllers/cartcontrollers");
const { isAuthenticated, isMember } = require("../middleware/auth");

const router=express.Router()
// add to cart
router.post("/cart/add",isAuthenticated,isMember,addCart)

// remove cart
router.get("/cart/remove",isAuthenticated,isMember,removeCart) 

// get all products in cart
router.get("/cart/all",isAuthenticated,isMember,allAddCart)


module.exports=router