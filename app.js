const express=require("express");
const app=express();
const path=require("path")

app.use(express.json());
app.use('/store', express.static(path.join(__dirname, 'store')));

const productRoutes=require("./routes/productroutes");
const userRoutes=require("./routes/user");
const favouriteRoutes=require("./routes/favouriteroutes")

app.use("/api",productRoutes)
app.use("/api",userRoutes)
app.use("/api",favouriteRoutes)


app.get("/",(req,res)=>{
    res.send("upload file")
})
module.exports=app;

