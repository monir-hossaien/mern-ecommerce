
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    store_id: {
        type: String,
        required: true,
    },
    store_password: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        enum: ['BDT', 'USD'],
        default: 'BDT',
    },
    success_url: {
        type: String,
        required: true,
    },
    fail_url: {
        type: String,
        required: true,
    },
    cancel_url: {
        type: String,
        required: true,
    },
    ipn_url: {
        type: String,
        required: true,
    },
    init_url: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

const PaymentSetting = mongoose.model("PaymentSetting", DataSchema);

export default PaymentSetting;