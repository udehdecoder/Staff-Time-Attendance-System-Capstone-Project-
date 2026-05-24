const express = require("express");
const router = express.Router();

const {
  clockIn,clockOut,getTodayStatus,
  getMonthlySummary,
  getAllAttendance,
} = require("../controllers/attendanceController");



const roleMiddleware = require("../middleware/roleMiddleware");
const protect = require("../middleware/authMiddleware");
const { checkAlreadyClockedIn, checkLeaveDay } = require("../middleware/attendanceMiddleware");



// Staff routes
router.post("/clock-in", protect, checkLeaveDay, checkAlreadyClockedIn, clockIn);
router.post("/clock-out", protect, clockOut);
router.get("/status", protect, getTodayStatus);
router.get("/summary", protect, getMonthlySummary);

// Admin/Manager only
router.get("/all", protect, roleMiddleware(["admin"]), getAllAttendance);

module.exports = router;