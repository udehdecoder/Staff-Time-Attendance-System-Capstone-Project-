require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const connectDB = require("./configs/database")
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const leaveRoutes = require("./routes/leaveRoute")

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leave", leaveRoutes)
connectDB();

const PORT = process.env.PORT 
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});