const leaveModel = require("../models/Leave")
const userModel = require("../models/User")
const mongoose = require("mogooose")

const requestLeave = async (req, res) => {
    const {userId, startdate, enddate, purpose} = req.body
    try{
        if (!userId || !startdate || !enddate || !purppose){
            res.status(401).json({message: "Wrong input detected"})
        }
        const existingRequest = await leaveModel.findOne({userId})
        if(existingRequest){
            res.status(403).json({message: "Request Conflict, this user already made a leave request"})
        }
        await leaveModel.create({
            userId, purposeOfLeave: purpose, startDate: startdate, endDate: enddate

        })
        res.status(201).json({message: "Request sucessfull submitted"})

    }
    catch(error){
        res.status(400).json({message: error.message})
    }


}

const getLeaveRequest = async(req, res) =>{
    try{
        const {userId} = req.params
        const existingRequest = await leaveModel.findOne({userId})
        if (!existingRequest){
            res.status(401).json({message: "this user did not request a leave"})
        }
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

const getAllLeaveRequest = async(req, res) =>{
    try{
        const requests = await leaveModel.find()
        res.status(200).json({message: requests})
    }
    catch(error){
        res.status(400).json(error)
    }
}

const approveLeave = async (req, res) =>{
    try{
        const {userId, status, startDate, endDate} = req.body
        if (userId || !status || !startDate || !endDate){
            res.status(401).json({message:"All fields needs to be filled up"})

        const userLeaveRequest = await leaveModel.findOne(userId)
        if (userLeaveRequest){
            res.status(404).json({message: "User leave Request not found!"})
        }
        if (userLeaveRequest.status === "approved"){
            res.status(401).json({message: "This leave request is already approved"})
        }
        if (status = "approved"){
        userLeaveRequest.onLeave = true
        userLeaveRequest.startDate = startDate
        userLeaveRequest.endDate = endDate
        userLeaveRequest.status = "approved"
        }
        await userLeaveRequest.save()

        res.status(200).json({message: "User succesfully approved!!",userLeaveRequest })

        }
        userLeaveRequest.onLeave = true
        userLeaveRequest.startDate = startDate
        userLeaveRequest.endDate = endDate
        userLeaveRequest.status = "rejected"
        
        await userLeaveRequest.save()
       

        res.status(200).json({message: "User leave succesfully rejected!!",userLeaveRequest })
    }
    catch(error){
        res.status(401).json({message: error.message})
    }
}
