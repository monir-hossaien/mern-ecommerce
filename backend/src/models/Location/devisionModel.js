import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
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
    }
},{

    timestamps: true,
    versionKey: false,
});

const Division = mongoose.model("Division", divisionSchema);

export default Division;
