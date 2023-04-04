require("dotenv").config();
require("./conn")
const express = require("express");
const PORT=process.env.PORT
const cors = require("cors");
const app = express();
const postRouter =require('./auth')
app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/postview",postRouter)


app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at ${PORT}`);
})


module.exports=app;