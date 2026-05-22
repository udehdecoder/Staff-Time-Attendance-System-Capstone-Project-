const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        surname: {
            type: String,
            required: true,
        },
        othername: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }, 
        role: {
            type: String,
            enum: ["admin", "staff"],
            default: "staff",
        }
        
    },
    {timestamps: true}
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);