const express=require("express");
const upload = require("../middleware/multerfile");
const  updateFile  = require("../controllers/update");
const router=express.Router();

router.put("/update/:id",upload,updateFile)

module.exports=router;