import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    role: {
        type: String, 
        enum: ["admin", "user", "faculty", "student"],
        default: "user",
    },
    dob: Date,
    created: {type: Date, default: Date.now},
    married: {type: Boolean, default: false},
}, 
{collections: "users"});

export default usersSchema;