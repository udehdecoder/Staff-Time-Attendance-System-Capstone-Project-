const express = require("express")

const attendanceModel = require("../models/Attendance")
const userModel = require("../models/userModel")


const getAllAttendance = async (req, res) => {
    const {date} = req.body
    try{
        if (!date){
            return res.status(400).json({message: "Date is required"})
        }
        const dayAttendance = await attendanceModel.find({date: new Date()})
        if (!dayAttendance){
           return res.status(404).json({message: "No attendance data found for the specified date"})
        }
        if (dayAttendance.length < 1){
        return res.status(404).json({message: "No atteandance found for this day"})
        
        }
        res.status(200).json({
            message: "Attendance data fetched successfully", 
            data: dayAttendance})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: "Error fetching attendance data", error: error.message})

    }
}

const getAttendanceAnalysis = async (req, res) =>{
    const {start, end} = req.body
    end = end.setHours(23, 59, 59, 999)
    try{
          const totalWorkers = await UserModel.countDocuments()
          const presentWorkers = await attendanceModel.countDocuments({"attendance.date": {
            $gte: start, $lte: end}
          })
          const absentWorkers = totalWorkers - presentWorkers
          const attendanceRate = ((presentWorkers/totalWorkers)*100).toFixed(1)

          return res.status(200).json({
            message: `Data of workers of the Date ${start}`,
            data: {
                "date": date, 
                "totalworkers" :totalWorkers,
                "present workers" :presentWorkers,
                "absent workers": absentWorkers, 
                attendanceRate: `${attendanceRate}%`
            }
          })
    }
    catch(error){
        res.status(401).json({message: "Sorry soomething happened, try again"})
        console.log(error)
    }
  
}

const getUserAttendance = async (req, res) =>{
    try{
    const {userId, start, end} = req.body
    end = end.setHours(23, 59, 59, 999)

    const result = await UserModel.aggregate([
        // match a specific user
        {$match: {
            _id: mongoose.Types.ObjectId(userId)
        }},
        //filter only that day's attendance\
        {$project:{
            name: 1,
            attendance: {
                $filter: {
                    input: "$attendance",
                    as: record,
                    cond:{
                    $and: [
                        {gte: ["$$record.date", start]},
                        {lte: ["$$record.date", end]}
                    ]
                    }

                }

            }
        }}
    ])

    if(!result){
        return res.status(404).json({message: "Attendance not found"})
    }
    return res.status(200).json(result[0])
    }
    catch(error){
        res.status(400).json("Error, Failed")
        console.log(error)
    }
}

module.exports = {getAllAttendance, getUserAttendance}