const Item = require("../models/fileschema");
const fs = require("fs");
const path = require("path");

const deleteFile = async (req, res) => {
  try {
    const data = await Item.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "File not found" });
    }

   
    if (data.image) {
    
      const oldImagePath = path.join(__dirname, "../store", path.basename(data.image));

    
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Image file deleted successfully:", oldImagePath);
      } else {
        console.log("Image file not found:", oldImagePath);
      }
    }

    return res.status(200).json({ message: "File deleted successfully", data });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ message: "Error deleting file", error: error.message });
  }
};

module.exports = deleteFile;
