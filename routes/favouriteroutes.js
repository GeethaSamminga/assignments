const express=require("express");
const{addFavourite, removeFavourite}=require("../controllers/favouritecontrollers");

const router=express.Router();

// add to favourite
router.get("/favourite/add/",addFavourite)

// remove favourite
router.delete("/favourite/remove",removeFavourite)

module.exports=router;

