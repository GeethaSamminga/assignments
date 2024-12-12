const express=require("express");
const app=express();
const path=require("path");
const multer=require("multer");
const upload=require("./middleware/multerfile")

app.use(express.json());
app.use('/store', express.static(path.join(__dirname, 'store')));

const productRoutes=require("./routes/productroutes");
const userRoutes=require("./routes/user");
const favouriteRoutes=require("./routes/favouriteroutes");
const cartRoutes=require("./routes/cartroutes")

app.use("/api",productRoutes)
app.use("/api",userRoutes)
app.use("/api",favouriteRoutes)
app.use("/api",cartRoutes)

app.get("/",(req,res)=>{
    res.send("upload file")
})
module.exports=app;

