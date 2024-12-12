const multer = require("multer");

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                return res.status(400).json({ error: "File too large. Max size is 1MB." });
            case "LIMIT_UNEXPECTED_FILE":
                return res.status(400).json({ error: "Unexpected file provided." });
            default:
                return res.status(400).json({ error: err.message });
        }
    }
    if (err.message === "Invalid file type. Only JPG, JPEG, and PNG are allowed.") {
        return res.status(400).json({ error: err.message });
    }
    next(err); // Pass other errors to the next middleware
};

module.exports = multerErrorHandler;
