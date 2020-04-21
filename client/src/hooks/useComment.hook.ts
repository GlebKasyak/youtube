import { useState, useEffect } from "react";
import { BaseEmoji } from "emoji-mart";

import { IComment, PostCommentDataType } from "../typescript/comment";
import { Handlers } from "../typescript/common";

type UseVideoReturnType = [
    string,
    Handlers.ChangeType,
    boolean,
    Handlers.SubmitType,
    () => void,
    () => void,
    boolean,
    () => void,
    (emoji: BaseEmoji) => void ];

type CbType = (data: PostCommentDataType) => void;
type DataType = {
    writer: string,
    postId: string,
    responseTo?: string
}

export const useComment = (cb: CbType, data: DataType): UseVideoReturnType => {
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [openReply, setOpenReply] = useState(false);

    const fetchData = async (data: PostCommentDataType) => {
        await cb(data);

        setCommentValue("");
        setOpenReply(!openReply);
    };

    const handleSubmit: Handlers.SubmitType = event => {
        event.preventDefault();

        const result = { content: commentValue, ...data };
        fetchData(result)
    };

    const handleSelect = (emoji: BaseEmoji) => setCommentValue(commentValue + emoji.native);

    const handleChange: Handlers.ChangeType = e => setCommentValue(e.target.value);

    const openEmoji = () => setShowEmojiPicker(!emojiPickerVisible);

    const handleCloseReply = () => {
        setOpenReply(false);
        setCommentValue("");
    };

    const handleSetOpenReply = () => setOpenReply(!openReply);

    return [
        commentValue,
        handleChange,
        openReply,
        handleSubmit,
        handleSetOpenReply,
        handleCloseReply,
        emojiPickerVisible,
        openEmoji,
        handleSelect
    ];
};



export const useCountOfComments = (commentList: IComment[], condition: undefined) => {
    const [number, setNumber] = useState(0);

    useEffect(() => {
        let commentNumber = 0;

        commentList.map(comment => {
            if(comment.responseTo === condition) {
                commentNumber++;
            }

            return comment;
        });

        setNumber(commentNumber);
    }, [commentList, condition]);

    return number;

};

type UseCommentListType = [IComment[], IComment[]];

export const useCommentList = (commentList: IComment[], parentCommentId: string): UseCommentListType => {
    const [currentCommentList, setCurrentCommentList] = useState<IComment[]>([]);
    const [nextCommentList, setNextCommentList] = useState<IComment[]>([]);

    useEffect(() => {
        commentList.filter((comment) => {
            if(comment.responseTo === parentCommentId) {
                setCurrentCommentList(prevState => prevState.concat(comment))
            } else {
                setNextCommentList(prevState => prevState.concat(comment))
            }
            return comment;
        })
    }, [commentList, parentCommentId]);

    return [currentCommentList, nextCommentList];
};