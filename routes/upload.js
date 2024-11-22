const express=require("express");
const upload = require("../middleware/multerfile");
const uploadFile = require("../controllers/upload");
const { isAuthenticated, isAdmin, checkAdmin } = require("../middleware/auth");

const router=express.Router();

router.post("/upload",isAuthenticated,isAdmin,checkAdmin,upload,uploadFile)

module.exports=router;