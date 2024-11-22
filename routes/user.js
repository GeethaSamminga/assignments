const express = require("express");
const { register, login, getallUsers } = require("../controllers/user");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getuser",isAuthenticated,isAdmin,getallUsers)

module.exports = router;
