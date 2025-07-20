
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
},{
    timestamps: true,
    versionKey: false,
})

const CartModel = mongoose.model("cart", DataSchema);

export default CartModel;