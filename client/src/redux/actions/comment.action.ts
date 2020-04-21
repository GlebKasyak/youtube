import { ThunkAction } from "redux-thunk";

import * as commentTypes from "../types/commentTypes";
import { CommentAPI } from "../../core/commentAPI";
import { AppStateType, InferActionsTypes } from "../reducers";

import { IComment, PostCommentDataType } from "../../typescript/comment";


export const actions = {
    postCommentAC: (payload: IComment) => ({ type: commentTypes.POST_COMMENT, payload } as const),
    getCommentsByPostIdAC: (payload: Array<IComment>) =>
        ({ type: commentTypes.GET_COMMENTS_BY_POST_ID, payload } as const)
};


type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, InferActionsTypes<typeof actions>>

export const postComment = (data: PostCommentDataType): ThunkActionType => async dispatch => {
  const response = await CommentAPI.postComment(data);

  const { success, comment } = response.data;
  if(success) dispatch(actions.postCommentAC(comment));
};

export const getCommentsByPostId = (postId: string): ThunkActionType => async dispatch => {
    const response = await CommentAPI.getCommentsByPostId(postId);

    const { success, commentsList } = response.data;
    if(success) {
        dispatch(actions.getCommentsByPostIdAC(commentsList))
    }
};