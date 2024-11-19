const fs = require("fs");
const path = require("path");

// Update data
const updateFile = (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, product, status } = req.body;
        const image = req.file ? req.file.filename : null;

        fs.readFile("dummy.json", (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error reading file" });
            }

            const datainclude = data ? JSON.parse(data) : [];
            const updateField = datainclude.find((response) => response.id == id);

            if (!updateField) {
                return res.status(404).json({ message: "File not found" });
            }


            const oldImage = updateField.image;

            updateField.title = title || updateField.title;
            updateField.description = description || updateField.description;
            updateField.product = product || updateField.product;
            updateField.status = status || updateField.status;
            
                if(updateField.image){
                    const oldImagePath = `./store/${updateField.image}`
                  if(oldImagePath){
                      fs.unlink(oldImagePath,(err)=>{
                         return res.status(200).json({ message: "File updated successfully", updateField });
                   })
                  }
                }

                updateField.image=image
          
            
            fs.writeFile("dummy.json", JSON.stringify(datainclude, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error updating file" });
                }


               
            });
        });
    } catch (error) {
        res.status(400).json({ message: "Error updating file", error });
    }
};

module.exports = updateFile;
