import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        color: {
            type: [String],
            enum: ['Red', 'Green', 'Blue', 'Black'],
            default: ['Red', 'Green', 'Blue', 'Black'], // All colors as default
        },
        size: {
            type: [String],
            enum: ['S', 'M', 'L', 'XL', 'XXL'],
            default: ['S', 'M', 'L', 'XL', 'XXL'], // All sizes as default
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ProductDetails = mongoose.model('ProductDetails', DataSchema);

export default ProductDetails;
