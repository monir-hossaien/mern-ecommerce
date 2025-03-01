import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
        shortDescription: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    discount: {
        type: Boolean,
        default: false,
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
        productImg: {
        type: [String],
        required: [true, "Image is required"],
    },
    stock: {
        type: Boolean,
        default: true,
    },
    star: {
        type: Number,
        default: 5,
    },
    remark: {
        type: String,
        enum: ["New", "Trending", "Popular", "flash", "Top"],
        default: "New",
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "CategoryId is required"],
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "BrandId is required"],
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)
const Product = mongoose.model("Product", DataSchema);

export default Product;