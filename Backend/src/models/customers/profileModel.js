
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    fax: {
        type: String,
        required: true,
    },
    shippingName: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    shippingCity: {
        type: String,
        required: true,
    },
    shippingState: {
        type: String,
        required: true,
    },
    shippingPostalCode: {
        type: String,
        required: true,
    },
    shippingCountry: {
        type: String,
        required: true,
    },
    shippingPhone: {
        type: String,
        required: true,
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