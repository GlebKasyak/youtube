import { Document } from "mongoose";

export interface ILikeDislikeDocument extends Document {
    userId?: string,
    commentId?: string
    videoId?: string
}
