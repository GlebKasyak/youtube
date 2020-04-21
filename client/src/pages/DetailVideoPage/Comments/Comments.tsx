import React, { Fragment } from "react";
import { BaseEmoji } from "emoji-mart";
import { Typography } from "antd";

import { CommentForm, Line } from "../../../components";
import SingleComment from "./SingleComment/SingleComment";
import ReplyComment from "./ReplyComment/ReplyComment";

import { IComment } from "../../../typescript/comment";
import { Handlers }from "../../../typescript/common";

type CommentsPropsType = {
    commentList: IComment[],
    userId: string,
    postId: string,
    commentValue: string,
    onChange: Handlers.ChangeType,
    openReply: boolean,
    onSubmit: Handlers.SubmitType,
    handleSetOpenReply: () => void,
    handleCloseReply: () => void,
    numberOfComments: number,
    emojiPickerVisible: boolean,
    openEmoji: () => void,
    onSelect: (emoji: BaseEmoji) => void
}

const Comments: React.FC<CommentsPropsType> = (
    {
        commentList,
        userId,
        postId,
        ...props
    }) => {

    return (
      <div>
          <Line
              children={ <Typography.Title level={4} >{ props.numberOfComments } comments</Typography.Title> }
          />

          { !!commentList.length && commentList.map(comment =>
              (!comment.responseTo &&
                 <Fragment key={ comment._id }>
                     <SingleComment
                         comment={ comment }
                         postId={ postId }
                         userId={ userId }
                         time={ comment.createdAt }
                         itemId={ comment._id }
                     />
                     <ReplyComment
                         commentList={ commentList }
                         parentCommentId={ comment._id }
                         postId={ postId }
                         userId={ userId }
                     />
                 </Fragment>

              )
          )}

          <div className="mt-1">
              { props.openReply
                  ? <CommentForm
                      onChange={ props.onChange }
                      onSubmit={ props.onSubmit }
                      onClick={ props.handleCloseReply }
                      value={ props.commentValue }
                      openEmoji={ props.openEmoji }
                      emojiPickerVisible={ props.emojiPickerVisible }
                      onSelect={ props.onSelect }
                  />
                  : <Line children="Leave a comment" onClick={ props.handleSetOpenReply } />
              }
          </div>
      </div>
    )
};

export default Comments;



