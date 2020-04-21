import React from "react";
import { Button, Input } from "antd";
import { Picker, BaseEmoji } from "emoji-mart";

import "./style.scss";

import { Handlers } from "../../../typescript/common";

type CommentFormPropsType = {
    value: string,
    onChange: Handlers.ChangeType,
    onSubmit: Handlers.SubmitType
    onClick: () => void,
    openEmoji?: () => void,
    emojiPickerVisible?: boolean,
    onSelect?: (emoji: BaseEmoji) => void
}

const CommentForm: React.FC<CommentFormPropsType> = (
    {
        value,
        onChange,
        onSubmit,
        onClick,
        openEmoji,
        emojiPickerVisible,
        onSelect
    }): JSX.Element =>  (
    <form className="comment-form" >
        <Input.TextArea
            onChange={ onChange }
            value={ value }
            onPressEnter={ onSubmit }
            placeholder="Leave a comment"
            autoFocus
            className="comment-form__textarea"
        />
        <div className="comment-form__btn-wrapper">
            <Button
                onClick={ onClick }
                className="comment-form__cancel"
            >
                Cancel
            </Button>
            { emojiPickerVisible &&
                <div className="comment-form__emoji-picker">
                    <Picker set="apple" onSelect={ onSelect } />
                </div>
            }
            <Button
                onClick={ openEmoji }
                icon="smile"
                type="link"
                className="comment-form__smile-btn"
            />
            <Button
                disabled={ !value }
                htmlType="submit"
                onClick={ onSubmit }
                className="comment-form__button"
            >
                Replay
            </Button>
        </div>
    </form>
);

export default CommentForm;