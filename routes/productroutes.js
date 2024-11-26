const express = require("express");
const upload = require("../middleware/multerfile");
const { 
    uploadFile, 
    updateFile, 
    fetchData, 
    deleteFile ,
    fetchallData
} = require("../controllers/productcontroller");

const { 
    isAuthenticated, 
    isAdmin, 
    checkAdmin, 
    isMember 
} = require("../middleware/auth");

const router = express.Router();

// Upload file route
router.post("/upload", isAuthenticated, isAdmin, checkAdmin, upload, uploadFile);

// Update file route
router.put("/update/:id", isAuthenticated, isAdmin, upload, updateFile);

// Fetch all data route
router.get("/all", fetchallData);

// Fetch file by ID route
router.get("/fetch/:id", isAuthenticated, isMember, upload, fetchData);

// Delete file route
router.delete("/remove/:id", isAuthenticated, isAdmin, deleteFile);

// fetch all data
router.get("/all",fetchallData)

module.exports = router;
