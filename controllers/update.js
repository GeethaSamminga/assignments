const Item = require("../models/fileschema");
const fs = require("fs");
const path = require("path");


const updateFile = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const { id } = req.params;
    const image = req.file ? req.file.filename : null;

   
    const updatedItem = await Item.findById(id);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
 
    if (image && updatedItem.image) {
      const oldImagePath = path.join(__dirname, "../store", path.basename(updatedItem.image));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); 
      }
    }

    updatedItem.title = title || updatedItem.title;
    updatedItem.description = description || updatedItem.description;
    updatedItem.category = category || updatedItem.category;
    updatedItem.status = status || updatedItem.status;

    if (image) {
      updatedItem.image = `${req.protocol}://${req.get("host")}/store/${image}`;
    }

 
    const savedItem = await updatedItem.save();

    res.status(200).json({
      message: "Item updated successfully",
      updatedItem: savedItem,
    });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(400).json({ message: "Error updating file", error });
  }
};

module.exports = updateFile;
