import React from "react";
import { connect } from "react-redux";

import { postComment } from "../../../redux/actions/comment.action";
import { useComment, useCountOfComments } from "../../../hooks/useComment.hook";

import { AppStateType } from "../../../redux/reducers";
import { IComment, PostCommentDataType } from "../../../typescript/comment";

import Comments from "./Comments";


type MapStateToPropsType = {
    id: string,
    commentList: Array<IComment>
}

type MapDispatchToPropsType = {
    postComment: (data: PostCommentDataType) => void
}

type OwnPropsType = {
    postId: string
}

type CommentsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const CommentsContainer: React.FC<CommentsContainerPropsType> = (
    {
        id,
        postId,
        postComment,
        commentList
    }) => {

    const [
        commentValue,
        handleChange,
        openReply,
        handleSubmit,
        handleSetOpenReply,
        handleCloseReply,
        emojiPickerVisible,
        openEmoji,
        handleSelect
    ] = useComment(postComment, { writer: id, postId });

    const numberOfComments = useCountOfComments(commentList, undefined);

    return <Comments
        commentList={ commentList }
        userId={ id }
        postId={ postId }
        commentValue={ commentValue }
        onChange={ handleChange }
        openReply={ openReply }
        onSubmit={ handleSubmit }
        handleSetOpenReply={ handleSetOpenReply }
        handleCloseReply={ handleCloseReply }
        numberOfComments={ numberOfComments }
        emojiPickerVisible={ emojiPickerVisible }
        openEmoji={ openEmoji }
        onSelect={ handleSelect }
    />
};

const mapStateToProps = ({ user, comment }: AppStateType): MapStateToPropsType => ({
    id: user.user._id,
    commentList: comment.commentList
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { postComment })
(CommentsContainer);


