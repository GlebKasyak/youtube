import { Document } from "mongoose";

export interface ICommentDocument extends Document {
    writer: string,
    postId: string
    responseTo?: string
    content: string
}