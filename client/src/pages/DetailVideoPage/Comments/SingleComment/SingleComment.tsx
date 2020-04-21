import React from "react";
import { connect } from "react-redux";

import { postComment } from "../../../../redux/actions/comment.action";
import { useComment } from "../../../../hooks/useComment.hook";

import { AppStateType } from "../../../../redux/reducers";
import { IComment, PostCommentDataType } from "../../../../typescript/comment";

import { CommentForm, CommentComponent } from "../../../../components";

type MapDispatchToProps = {
    postComment: (data: PostCommentDataType) => void
}

type OwnPropsType = {
    comment: IComment,
    postId: string,
    userId: string,
    itemId: string,
    time?: string,
}

type SingleCommentPropsType = MapDispatchToProps & OwnPropsType;

const SingleComment: React.FC<SingleCommentPropsType> = (
    {
        postComment,
        comment,
        postId,
        userId,
        itemId,
        time
    }): JSX.Element => {
    const [
        commentValue,
        handleChange,
        openReply,
        handleSubmit,
        handleSetOpenReply,
        handleCloseReply
    ] = useComment(postComment, { writer: userId, responseTo: comment._id, postId });

    return (
        <>
            <CommentComponent
                onClick={ handleSetOpenReply }
                firstName={ comment.writer.firstName }
                avatar={ comment.writer.image! }
                content={ comment.content }
                time={ time! }
                userId={ userId }
                itemId={ itemId }
            />
            { openReply &&
                <CommentForm
                    onChange={ handleChange }
                    onSubmit={ handleSubmit }
                    onClick={ handleCloseReply }
                    value={ commentValue }
                />
            }
        </>
    )
};

export default connect<{}, MapDispatchToProps, OwnPropsType, AppStateType>(
    null,
    { postComment })
(SingleComment);