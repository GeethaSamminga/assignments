const express=require("express");
const{addFavourite, removeFavourite,allfavourites}=require("../controllers/favouritecontrollers");
const { isAuthenticated, isMember } = require("../middleware/auth");

const router=express.Router();

// add to favourite
router.get("/favourite/add/",isAuthenticated,isMember,addFavourite)

// remove favourite
router.delete("/favourite/remove",isAuthenticated,isMember,removeFavourite)

// get all favourites
router.get("/favourite/all",isAuthenticated,isMember,allfavourites)

module.exports=router;

