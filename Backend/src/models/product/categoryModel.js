
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryImg: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

const Category = mongoose.model("Category", DataSchema);

export default Category;