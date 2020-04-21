import { Reducer } from "redux";

import * as commentTypes from "../types/commentTypes";
import { InferActionsTypes } from "./index";
import { actions } from "../actions/comment.action";
import { CommentState, IComment } from "../../typescript/comment";

const initialState: CommentState = {
    commentList: []
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const reducer: Reducer<CommentState, ActionsTypes> = (
    state = initialState,
    action: ActionsTypes
): CommentState => {
    switch (action.type) {
        case commentTypes.POST_COMMENT:
            return {
               ...state,
                commentList: [...state.commentList, action.payload] as Array<IComment>
            };
        case commentTypes.GET_COMMENTS_BY_POST_ID:
            return {
                ...state,
                commentList: action.payload as Array<IComment>
            };
        default:
            return state;
    }
};

export default reducer;

