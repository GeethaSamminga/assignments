const express=require("express");
const upload = require("../middleware/multerfile");
const fetchData=require("../controllers/fetch");
const { isAuthenticated, isMember,  } = require("../middleware/auth");

const router=express.Router();

router.get("/fetch/:id",isAuthenticated,isMember,upload,fetchData)

module.exports=router;