import mongoose from "mongoose";

const unionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bn_name: {
        type: String,
        required: true,
    },
    postID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    }
},{

    timestamps: true,
    versionKey: false,
});

const Union = mongoose.model("Union", unionSchema);

export default Union;
