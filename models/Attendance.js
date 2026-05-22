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
        duration: { type: Number, default: null },     // in minutes
        status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
        },
        
    },
    {timestamps: true}
);

// Enforce one attendance record per user per day at the DB level
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);