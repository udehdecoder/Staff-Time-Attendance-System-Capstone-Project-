const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    surname: {type: String, require: true},
    othername: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, 
            enum :["ADMIN", "WORKER"],
            default: "WORKER",
            require: true

        }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)