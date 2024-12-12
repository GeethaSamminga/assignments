const express=require("express");
const{addFavourite, removeFavourite,allfavourites}=require("../controllers/favouritecontrollers");
const { isAuthenticated, isMember } = require("../middleware/auth");

const router=express.Router();

// add to favourite
router.get("/favourite/add",addFavourite)

// remove favourite
router.delete("/favourite/remove",removeFavourite)

// get all favourites
router.get("/favourite/all",isAuthenticated,allfavourites)

module.exports=router;

