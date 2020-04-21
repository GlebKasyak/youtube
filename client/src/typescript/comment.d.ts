// import { IResponseDataType, AxiosPromise } from "./common";
import { IUser } from "./user";

export interface CommentState {
    commentList: Array<IComment>
}

export interface IComment {
    _id: string,
    writer: IUser,
    content: string,
    postId: string,
    responseTo: string,
    createdAt?: string,
    updatedAt?: string
}

export type PostCommentDataType = {
    writer: string,
    responseTo?: string,
    postId: string,
    content: string
}

// export namespace AxiosResponseData {
//     type PostComment = { comment: IComment } & IResponseDataType;
//     type GetCommentsByPostId = { commentsList: Array<IComment> } & IResponseDataType;
// }






