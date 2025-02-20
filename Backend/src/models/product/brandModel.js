
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    },
    brandImg: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

const Brand = mongoose.model("Brand", DataSchema);

export default Brand;