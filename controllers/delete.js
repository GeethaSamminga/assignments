const fs = require("fs");


const deleteFile = (req, res) => {
    const { id } = req.params;

    
    fs.readFile("dummy.json", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file for deletion" });
        }

        const datainclude = data ? JSON.parse(data) : [];

       
        const deleteField = datainclude.find((item) => item.id == id);

        if (!deleteField) {
            return res.status(404).json({ message: "File not found" });
        }

      
        const updatedData = datainclude.filter((item) => item.id != id);

     
        const updateJSONFile = () => {
            fs.writeFile("dummy.json", JSON.stringify(updatedData, null, 2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ message: "Error updating file after deletion" });
                }
                return res.status(200).json({ message: "File and associated image deleted successfully" });
            });
        };

       
        if (deleteField.image) {
            const oldImagePath = `./store/${deleteField.image}`;
            fs.unlink(oldImagePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Error deleting image:", unlinkErr);
                    return res.status(500).json({ message: "Error deleting associated image" });
                }
             
                updateJSONFile();
            });
        } else {
         
            updateJSONFile();
        }
    });
};

module.exports = deleteFile;
