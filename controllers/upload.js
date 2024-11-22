const Item = require("../models/fileschema");

const uploadFile = async (req, res) => {
    try {
        const { title, description, category, status } = req.body;

        if (!title || !description || !category || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const image = req.file ? req.file.filename : null;
        if (!image) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const imageLink = `${req.protocol}://${req.get("host")}/store/${image}`;

        const file = {
            title,
            description,
            category,
            image: imageLink,
            status,
        };

        const newFile = new Item(file);
        await newFile.save();

        res.status(201).json({
            message: 'File uploaded successfully',newFile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports=uploadFile