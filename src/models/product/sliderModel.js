import mongoose, {Schema as schema} from 'mongoose';

const DataSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price:{
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ProductSlider = mongoose.model("productSlider", DataSchema);

export default ProductSlider;