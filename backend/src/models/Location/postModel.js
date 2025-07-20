import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bn_name: {
        type: String,
        required: true,
    },
    districtID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
        required: true,
    }
},{

    timestamps: true,
    versionKey: false,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
