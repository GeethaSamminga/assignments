const fs = require("fs");

// to upload file
const uploadFile = (req, res) => {
    try {
        const { id, title, description, product, status } = req.body;
        if (!id || !title || !description || !product || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const image = req.file ? req.file.filename : null;
        const imageLink=`${req.protocol}://${req.get("host")}/store/${image}`
       
        

        const file = { id, title, description, image, product, status ,url:imageLink};

       
        fs.readFile("dummy.json", (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error in reading file", err });
            }

            let dataInclude = [];

            
            if (data && data.length > 0) {
                try {
                    dataInclude = JSON.parse(data); 
                   
                } catch (err) {
                    return res.status(500).json({ message: "Error parsing file data", err });
                }
            }

          
            dataInclude.push(file);

           
            fs.writeFile("dummy.json", JSON.stringify(dataInclude, null), (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error writing to file", error: err });
                }

                
                res.status(201).json({ message: "Successfully added file", file });
            });
        });
    } catch (error) {
        res.status(400).json({ message: "Error creating file upload", error });
    }
};

module.exports = uploadFile;
