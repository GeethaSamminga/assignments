const Item = require("../models/fileschema")

// fetching uploaded data 
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

module.exports = fetchData;