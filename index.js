const express = require("express");
const app = express();
const connectDB = require("./configs/database");
require("dotenv").config();
connectDB();


app.get('/', (req, res) =>{
    res.status(200).json("capstone project 22 is running")
})
app.listen( 5000, () =>{
    console.log("capstone project 22 is running on port 5000")
})