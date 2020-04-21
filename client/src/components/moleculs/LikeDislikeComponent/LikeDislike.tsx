import React from "react";
import { Tooltip, Icon } from "antd";

import "./style.scss";

type LikeDislikePropsType = {
    onLike: () => void,
    onDislike: () => void,
    likeAction: string | null,
    dislikeAction: string | null,
    likes: number,
    dislikes: number
}

const LikeDislike: React.FC<LikeDislikePropsType> = (
    {
        onLike,
        onDislike,
        likeAction,
        dislikeAction,
        likes,
        dislikes
    }) => (
    <div className="like-dislike-component">
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={ likeAction === "liked" ? "filled" : "outlined" }
                          onClick={ onLike } />
                </Tooltip>
                <span className="like-dislike-component__numbers" >{ likes }</span>
            </span>&nbsp;&nbsp;
        <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={ dislikeAction === "disliked" ? "filled" : "outlined" }
                        onClick={ onDislike }
                    />
                </Tooltip>
                <span className="like-dislike-component__numbers" >{ dislikes }</span>
            </span>
    </div>
);

export default LikeDislike;