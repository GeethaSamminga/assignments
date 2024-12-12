const express = require("express");
const upload = require("../middleware/multerfile");
const {
    uploadFile,
    updateFile,
    fetchData,
    deleteFile,
    fetchallData
} = require("../controllers/productcontroller");

const { isAuthenticated, isAdmin, isMember } = require("../middleware/auth");
const multerErrorHandler = require("../middleware/multerhandler");

const router = express.Router();

// Upload file route
router.post("/upload", isAuthenticated, isAdmin, upload.single("image"),multerErrorHandler, uploadFile);

// Update file route
router.put("/update/:id", isAuthenticated, isAdmin, upload.single("image"), updateFile);

// Fetch all data route
router.get("/all", fetchallData);

// Fetch file by ID route
router.get("/fetch/:id", isAuthenticated, isMember, fetchData);

// Delete file route
router.delete("/remove/:id", isAuthenticated, isAdmin, deleteFile);

module.exports = router;
