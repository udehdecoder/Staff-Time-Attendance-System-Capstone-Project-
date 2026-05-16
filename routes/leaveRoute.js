const express = require("express")
const {requestLeave, getLeaveRequest,approveLeave, getAllLeaveRequest, rejectLeave} = require("../controllers/leaveController")

const router = express.Router()

router.patch("/request", requestLeave)
router.get("/getrequest/:userId",getLeaveRequest)
router.get('/getallrequests', getAllLeaveRequest)
router.patch("/approveleave/:id", approveLeave)
router.patch("/rejectleave/:id", rejectLeave)

module.exports = router