import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: "false",
    })

const LegalModel = mongoose.model("legal", DataSchema);
export default LegalModel;