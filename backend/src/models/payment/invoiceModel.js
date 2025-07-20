
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    customerDetails: {
        type: Object,
        required: true,
    },
    shippingDetails: {
        type: Object,
        required: true,
    },
    deliveryStatus: {
        type: String,
        enum: ['Pending', 'Canceled', 'Failed', 'Success'],
        default: 'Pending',
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Canceled', 'Failed', 'Success'],
        default: 'Pending',
    },
    transactionId: {
        type: String,
        required: true,
    },
    validationId: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    vat: {
        type: Number,
        required: true,
    },
    payable: {
        type: Number,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

const InvoiceModel = mongoose.model("invoice", DataSchema);

export default InvoiceModel;