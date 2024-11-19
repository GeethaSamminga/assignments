const fs=require("fs")

// fetching uploaded data 
const fetchData=(req,res)=>{
try{
const{id}=req.params
fs.readFile("dummy.json",(err,data)=>{
if(err){
   return res.status(500).send({message:"error while reading file"})
}

const datainclude=data?JSON.parse(data):[];

const field = datainclude.find(res=>res.id==id)
console.log(field)
if (field) {
    res.status(200).json(field);
} else {
    res.status(404).json({ message: "File not found" });
}

})
}
catch(error){
    res.status(400).json({message:"Error creting in file upload",error})
    }
}

module.exports=fetchData
