const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        entry: {
            type: Date,
        },
        exit: {
            time: {
                type: Date,
            },

            reason: {
                type: String,
            }
        },
        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Attendance", attendanceSchema);