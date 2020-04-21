import { Schema, model } from "mongoose";
import { IVideo } from "../interfaces/videoInterface";

const videoSchema: Schema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        required: true,
        trim: true,
        type: String,
        maxLength: 50
    },
    description: {
        type: String,
        required: true
    },
    privacy: String,
    filePath: String,
    category: String,
    views: {
        type: Number,
        default: 0
    },
    duration: String,
    thumbnail: String
}, {
    timestamps: true
});

export default model<IVideo>("Video", videoSchema);