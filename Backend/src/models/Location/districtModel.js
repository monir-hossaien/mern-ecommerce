import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    bn_name: {
        type: String,
        required: true,
    },
    iso_code: {
        type: String,
        required: true,
    },
    divisionID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Division",
        required: true,
    }
},{

    timestamps: true,
    versionKey: false,
});

const District = mongoose.model("District", districtSchema);

export default District;
