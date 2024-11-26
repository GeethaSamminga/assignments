const Item = require("../models/fileschema");
const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res) => {
    try {
        const { title, description, category, status,cost,quantity} = req.body;

        if (!title || !description || !category || !status||!cost||!quantity) {
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
            cost,
            quantity
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

//  update file 
const updateFile = async (req, res) => {
    try {
      const { title, description, category, status,quantity } = req.body;
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
      updatedItem.quantity=quantity||updatedItem.quantity
  
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


//   fetch product by id

const fetchData=async(req,res)=>{
try{
const{id}=req.params

const data=await Item.findById(id);

if(data){
   return res.status(200) .json(data)
}
else{
    return res.status(404).json({ error: 'data not found' });
}

}
catch(error){
    res.status(400).json({message:"Error creting in file fetching",error})
    }
}



// delete product

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

//   fetch all data
  
const fetchallData = async (req, res) => {
  try {
      const result = await Item.aggregate([
          {
              $group: {
                  _id: null,
                  totalQuantity: { $sum: "$quantity" }, 
                  products: { $push: "$$ROOT" } 
              }
          }
      ]);

      if (result.length === 0) {
          return res.status(200).json({ message: "No products found", products: [], totalQuantity: 0 });
      }

      const { totalQuantity, products } = result[0];

    
      if (totalQuantity > 50) {
          return res.status(400).json({ message: "Products sold out" });
      }

      res.status(200).json({
          message: "Fetched all products successfully",
          totalQuantity,
          products
      });

  } catch (error) {
      console.error("Error fetching all data:", error);
      res.status(500).json({ error: error.message });
  }
};



module.exports={uploadFile,updateFile,fetchData,deleteFile,fetchallData}