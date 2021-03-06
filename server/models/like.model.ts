import { Schema, model, Types } from "mongoose";
import { ILikeDislikeDocument } from "../interfaces/likeDislikeInterface";

const likeSchema: Schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    commentId: {
        type: Types.ObjectId,
        ref: "Comment"
    },
    videoId: {
        type: Types.ObjectId,
        ref: "Video"
    },
}, {
    timestamps: true
});


export default model<ILikeDislikeDocument>("Like", likeSchema);