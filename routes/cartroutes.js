const express=require("express");
const{addCart,removeCart,allAddCart}=require("../controllers/cartcontrollers");
const { isAuthenticated, isMember } = require("../middleware/auth");

const router=express.Router()
// add to cart
router.post("/cart/add",isAuthenticated,addCart)

// remove cart
router.get("/cart/remove",isAuthenticated,removeCart) 

// get all products in cart
router.get("/cart/all",isAuthenticated,allAddCart)


module.exports=router