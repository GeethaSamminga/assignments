const express=require("express");
const uploadFile = require("../controllers/upload");
const upload = require("../middleware/multerfile");


const router=express.Router();

router.post("/upload",upload,uploadFile)

module.exports=router;