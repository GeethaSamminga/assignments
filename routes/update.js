const express=require("express");
const upload = require("../middleware/multerfile");
const updateFile = require("../controllers/update");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const router=express.Router();

router.put("/update/:id",isAuthenticated,isAdmin,upload,updateFile)

module.exports=router;