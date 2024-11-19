const express=require("express");
const upload = require("../middleware/multerfile");
const fetchData = require("../controllers/fetch");
const router=express.Router();

router.get("/fetch/:id",upload,fetchData)

module.exports=router;