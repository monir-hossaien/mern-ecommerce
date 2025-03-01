
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "user email must be required"],
        unique: [true, "This email is already in use"],
    },
    profileImage: {
        type: String,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpire: {
        type: Date,
        default: null
    },
    roll: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false,
})

const User = mongoose.model("User", userSchema);

export default User