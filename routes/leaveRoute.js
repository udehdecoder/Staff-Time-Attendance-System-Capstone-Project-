const express = require("express")
const {requestLeave, getLeaveRequest,approveLeave, getAllLeaveRequest} = require("../controllers/leaveController")

const router = express.Router()

router.patch("/request", requestLeave)
router.get("/getrequest/:userId",getLeaveRequest)
router.get('/getallrequests', getAllLeaveRequest)
router.post("/approveleave", approveLeave)
