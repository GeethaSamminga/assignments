const express=require("express");
const deleteFile = require("../controllers/delete");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const router=express.Router();

router.delete("/remove/:id",isAuthenticated,isAdmin,deleteFile)

module.exports=router;