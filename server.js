const dotenv=require("dotenv")
const app=require("./app");
const connectDB = require("./data/database");

dotenv.config({path:"./data/config.env"});

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});