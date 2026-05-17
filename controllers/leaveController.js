const leaveModel = require("../models/LeaveModel")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")

const requestLeave = async (req, res) => {
    const {userId, startdate, enddate, purpose} = req.body
    try{
        if (!userId || !startdate || !enddate || !purpose){
            res.status(401).json({message: "Wrong input detected"})
        }
        const existingRequest = await leaveModel.findOne({userId})
        if(existingRequest){
           return res.status(403).json({message: "Error", data: "Request Conflict, this user already made a leave request"})
        }
        await leaveModel.create({
            userId, purposeOfLeave: purpose, startDate: startdate, endDate: enddate

        })
        res.status(201).json({message: "Request sucessfull submitted"})

    }
    catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }


}

const getLeaveRequest = async(req, res) =>{
    try{
        const {userId} = req.params
        const existingRequest = await leaveModel.findOne({userId}).populate("userId", "name role", )
        if (!existingRequest){
            res.status(401).json({message: "this user did not request a leave"})
        }
        res.status(200).json({message: "Leave Request.", data: existingRequest})
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

const getAllLeaveRequest = async(req, res) =>{
    try{
        const requests = await leaveModel.find().populate("userId", "name role")
        if (!requests){
            res.status(404).json("No request found")
        }
        res.status(200).json({message: requests})
    }
    catch(error){
        res.status(400).json(error)
    }
}

const approveLeave = async (req, res) =>{

    try{
        const { startDate, endDate, status } = req.body
        const {id} = req.params
        const userLeaveRequest = await leaveModel.findById(id)

        if (!userLeaveRequest){
           return res.status(404).json({message: "User leave Request not found!"})
        }
        if (userLeaveRequest.status === "approved"){
           return res.status(401).json({message: "This leave request is already approved"})
        }

            const updatedLeaveRequest = await leaveModel.findByIdAndUpdate(id, 
                {
                status: "approved",
                startDate, 
                endDate,
                onLeave: true
            },
                {new: true}).populate("userId", "name role")
        return res.status(200).json({message: "User leave request updated!!",data: updatedLeaveRequest})
        }

    
    catch(error){
        console.log(error)
        res.status(401).json({message: error.message})
    }
}
const rejectLeave = async (req, res) =>{
      try{
        const { startDate, endDate } = req.body
        const {id} = req.params
        const userLeaveRequest = await leaveModel.findById(id)

        if (!userLeaveRequest){
           return res.status(404).json({message: "User leave Request not found!"})
        }
        if (userLeaveRequest.status === "rejected"){
           return res.status(401).json({message: "This leave request is already rejected"})
        }

            const updatedLeaveRequest = await leaveModel.findByIdAndUpdate(id, 
                {
                status: "rejected",
                startDate, 
                endDate,
                onLeave: no
            },
                {new: true}).populate("userId", "name role")
        return res.status(200).json({message: "User leave request updated!!",data: updatedLeaveRequest})
        }

    
    catch(error){
        console.log(error)
        res.status(401).json({message: error.message})
    }
}

module.exports = {getAllLeaveRequest, getLeaveRequest, requestLeave, approveLeave, rejectLeave}