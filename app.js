const express=require("express");
const app=express();
const path=require("path")

app.use(express.json());
app.use('/store', express.static(path.join(__dirname, 'store')));

const uploadRoutes=require("./routes/upload")
const fetchRoutes=require("./routes/fetch")
const updateRoutes=require("./routes/update")
const deleteRoutes=require("./routes/delete")
const userRoutes=require("./routes/user")


app.use("/api",uploadRoutes)
app.use("/api",fetchRoutes)
app.use("/api",updateRoutes)
app.use("/api",deleteRoutes)
app.use("/api",userRoutes)

app.get("/",(req,res)=>{
    res.send("upload file")
})
module.exports=app;

