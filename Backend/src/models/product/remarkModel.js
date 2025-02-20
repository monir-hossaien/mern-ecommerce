
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
    }
},{
    timestamps: true,
    versionKey: false,
})

const Remark = mongoose.model("Remark", DataSchema);

export default Remark;