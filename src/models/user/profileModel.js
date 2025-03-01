
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
    },
    shippingName: {
        type: String,
        required: true,
    },
    shippingDivision: {
        type: String,
        required: true,
    },
    shippingDistrict: {
        type: String,
        required: true,
    },
    shippingPost: {
        type: String,
        required: true,
    },
    shippingArea: {
        type: String,
        required: true,
    },
    shippingPhone: {
        type: String,
        required: true,
    },
    shippingPostalCode: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

},{
    timestamps: true,
    versionKey: false,
})

const UserProfile = mongoose.model("Profile", DataSchema);

export default UserProfile;