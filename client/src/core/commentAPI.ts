import instance from "./api";

import { PostCommentDataType } from "../typescript/comment";

export class CommentAPI {
    static postComment = (data: PostCommentDataType) => {
        return instance.post("/comment", data)
    };

    static getCommentsByPostId = (postId: string) => {
        return instance.get(`/comment/${ postId }`)
    };
}







