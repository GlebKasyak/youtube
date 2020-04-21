import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";

import { updateImage } from "../../../redux/actions/user.actions";

import { storageKeys } from "../../../utils/constants";
import { AppStateType } from "../../../redux/reducers";

import "./style.scss";

type MapDispatchToPropsType = {
    updateImage: (type: string, file: File, token: string) => void
};

type OwnPropsType = { text: string };

type UploadButtonPropsType = MapDispatchToPropsType & OwnPropsType;


const UploadButton: React.FC<UploadButtonPropsType> = ({ text, updateImage }) => {
    const token = JSON.parse(localStorage.getItem(storageKeys.userInfo) || "{}").token;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateImage("image", e.target.files![0], token);
    };

    return (
        <div className="upload-file">
            <Icon type="upload" className="upload-file__icon" />
            { text }
            <input onChange={ handleChange } type="file" className="upload-file__file-btn" />
        </div>
    )
};

export default connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    null,
    { updateImage })
(UploadButton);