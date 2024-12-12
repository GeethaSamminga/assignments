const multer = require("multer");
const path = require("path");

const ds = multer.diskStorage({
    destination: (req, file, cb) => {
      
        cb(null, "store");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const filter = (req, file, cb) => {
  
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        cb(new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed."), false); 
    }
};

const upload = multer({
    storage: ds,
    fileFilter: filter,
    limits: {
        fileSize: 1 * 1024 * 1024 // Limit the file size to 1MB
    }
});

module.exports = upload;
