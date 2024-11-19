const multer=require("multer");

const ds=multer.diskStorage({
    destination:"store",
    filename:(req,file,cb)=>{

        path=`${file.originalname}`
        cb(null,path)

    }
});

const filter=(req,file,cb)=>{

    // console.log(file)

    const allowedTypes=["image/jpg","image/jpeg","image/png"]
    if(allowedTypes.includes(file.mimetype)){
       cb(null,true) 
    }
    else{
        cb(new Error("invalid file type"))
    }

}

const upload=multer({
    storage:ds,
    fileFilter:filter,
    limits:{
    filesize:1*1024*1024
    }
    
    }).single("image")

    module.exports=upload
    