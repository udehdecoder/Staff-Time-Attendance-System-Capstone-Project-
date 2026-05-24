require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const connectDB = require("./configs/database")
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const leaveRoutes = require("./routes/leaveRoute")
const attendanceRoutes = require("./routes/attendanceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leave", leaveRoutes)
// Mount attendance routes
app.use("/api/attendance", attendanceRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Attendance Management System API");
});
const PORT = process.env.PORT 
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});