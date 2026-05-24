const express = require("express")
const {requestLeave, getLeaveRequest,approveLeave, getAllLeaveRequest, rejectLeave, deleteLeave} = require("../controllers/leaveController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/rolemiddleware")

const router = express.Router()

router.post("/request", authMiddleware, requestLeave)
router.get("/getrequest/:userId", authMiddleware, roleMiddleware(["admin"]),getLeaveRequest)
router.get('/getallrequests', authMiddleware, roleMiddleware(["admin"]), getAllLeaveRequest)
router.patch("/approveleave/:id", authMiddleware, roleMiddleware(["admin"]), approveLeave)
router.patch("/rejectleave/:id", authMiddleware, roleMiddleware(["admin"]), rejectLeave)
router.delete("/deleteleave/:id", authMiddleware, roleMiddleware(["admin"]), deleteLeave)

module.exports = router