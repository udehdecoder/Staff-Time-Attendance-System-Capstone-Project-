const express = require("express");
const app = express();
const connectDB = require("./configs/database");
require("dotenv").config();
app.use(express.json())
app.use(express.urlencoded())
const leaveRoute = require("./routes/leaveRoute")
connectDB();


app.get('/', (req, res) =>{
    res.status(200).json("capstone project 22 is running")
})

app.use("/api/user")
app.use("/api/attendance")
app.use("/api/leave", leaveRoute)











app.listen( 5000, () =>{
    console.log("capstone project 22 is running on port 5000")
})