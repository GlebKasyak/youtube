import { Schema, model } from "mongoose";
import { ICommentDocument } from "../interfaces/commentInterface";

const commentSchema: Schema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default model<ICommentDocument>("Comment", commentSchema);