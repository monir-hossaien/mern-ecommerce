import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    description: {
        type: String,
        required: [true, "Please enter a description"],
    },
    image: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
        versionKey: "false",
    })

const Feature = mongoose.model("Feature", DataSchema);
export default Feature;