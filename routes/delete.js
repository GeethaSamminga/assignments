const express=require("express");
const deleteFile = require("../controllers/delete");
const router=express.Router();

router.delete("/remove/:id",deleteFile)

module.exports=router;