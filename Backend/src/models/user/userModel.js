
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "user email must be required"],
        unique: [true, "This email is already in use"]
    },
    otp: {
        type: String,
        default: null
    },
    otpExpire: {
        type: Date,
        default: null
    }
},{
    timestamps: true,
    versionKey: false,
})

const User = mongoose.model("User", userSchema);

export default User