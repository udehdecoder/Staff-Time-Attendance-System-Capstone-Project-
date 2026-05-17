
const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
    {
        userId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }],
        onLeave: {
            type: Boolean,
            enum: [true, false],
            default: false,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        purposeOfLeave: {
            type: String,
        },
        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Leave", leaveSchema);