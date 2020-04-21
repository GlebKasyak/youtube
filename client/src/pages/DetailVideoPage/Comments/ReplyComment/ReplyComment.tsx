import React, { useState } from "react";
import SingleComment from "../SingleComment/SingleComment";

import { useCountOfComments, useCommentList } from "../../../../hooks/useComment.hook";

import { IComment } from "../../../../typescript/comment";

import { TextWithIcon } from "../../../../components";

import "./style.scss";

type ReplyCommentPropsType = {
    commentList:  Array<IComment>,
    parentCommentId?: string,
    postId: string,
    userId?: string
};

const ReplyComment: React.FC<ReplyCommentPropsType> = ({ commentList, parentCommentId, postId, userId }): JSX.Element => {
    const [openReply, setOpenReply] = useState(false);

    const numberOfComments = useCountOfComments(commentList, undefined);
    const [currentCommentList, nextCommentList] = useCommentList(commentList, parentCommentId!);

    return (
        <div className="reply-comment">
            { !!numberOfComments &&
                <TextWithIcon
                    text={ ` View ${ numberOfComments } more comment(s)` }
                    isOpen={ openReply }
                    onClick={ () => setOpenReply(!openReply) }
                    className="reply-comment__numbers"
                />
            }

            { openReply &&
                currentCommentList.map((comment, index) => (
                    <div className="reply-comment__comment-wrapper" key={ index } >
                        <SingleComment
                            comment={ comment }
                            postId={ postId }
                            userId={ userId! }
                            itemId={ comment._id }
                            time={ comment.createdAt }
                        />
                        <ReplyComment
                            commentList={ nextCommentList }
                            parentCommentId={ comment._id }
                            postId={ postId }
                        />
                    </div>
                ))
            }

        </div>
    )
};

export default ReplyComment;