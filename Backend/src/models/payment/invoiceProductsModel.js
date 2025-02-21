
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    invoiceId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        enum: ['Red', 'Green', 'Blue', 'Black'],
        default: "Red",
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        default: 'M'
    }
},{
    timestamps: true,
    versionKey: false,
})

const InvoiceProductModel = mongoose.model("InvoiceProduct", DataSchema);

export default InvoiceProductModel;