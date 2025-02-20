
import mongoose, {Schema} from "mongoose";

const DataSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true,
    versionKey: false,
})

const ProductReview = mongoose.model("Review", DataSchema);

export default ProductReview;