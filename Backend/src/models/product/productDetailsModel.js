import mongoose, {Schema as schema} from 'mongoose';

const DataSchema = new mongoose.Schema({
        image1: {type: String, required: true},
        image2: {type: String, required: true},
        image3: {type: String, required: true},
        image4: {type: String, required: true},
        description: {
            type: String,
            required: true,
        },
        color:{
            type: String,
            enum: ['red', 'green', 'blue'],
            default: 'green'
        },
        size: {
            type: String,
            enum: ['small', 'medium', 'large'],
            default: 'medium',
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ProductDetails = mongoose.model("ProductDetails", DataSchema);

export default ProductDetails;