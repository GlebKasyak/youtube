import React from "react";
import moment from "moment";
import { Comment, Avatar, Tooltip } from "antd";

import LikeDislike from "../LikeDislikeComponent/LikeDislikeContainer";

import { timeFromNow, setAvatar } from "../../../utils/helpers";
import "./style.scss";

import { Handlers } from "../../../typescript/common";

type CommentComponentPropsType = {
    onClick: Handlers.ClickType,
    firstName: string,
    avatar: string,
    content: string,
    time: string,
    itemId: string,
    userId: string
}

const CommentComponent: React.FC<CommentComponentPropsType> = (
    {
        onClick,
        firstName,
        avatar,
        content,
        time,
        itemId,
        userId
    }) => (
    <Comment
        className="comment"
        actions={[
            <LikeDislike itemName="commentId" itemId={ itemId } userId={ userId } />,
            <span onClick={ onClick } className="comment__replay-to" >
                  Reply to
            </span>
        ]}
        author={
            <span className="comment__name" >
                  { firstName }
              </span>
        }
        avatar={ <Avatar src={ setAvatar(avatar) } alt="avatar" /> }
        content={ <p className="comment__content" >{ content }</p> }
        datetime={
            <Tooltip title={ moment(time).format('YYYY-MM-DD HH:mm:ss') }>
                <span className="comment__time" >{ timeFromNow(time) }</span>
            </Tooltip>
        }
    />
);

export default CommentComponent;