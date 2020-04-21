import React, { useState } from "react";
import { connect } from "react-redux";
import { History } from "history";

import { VideoAPI } from "../../core/vedeoAPI";
import { Category, VideoAccess } from "../../utils/videoSettings";
import { actions } from "../../redux/actions/video.actions";

import { AppStateType } from "../../redux/reducers";
import { IUser } from "../../typescript/user";
import { IVideoData, ValueType, VideoFileType, InfoType } from "../../typescript/video";
import { Handlers } from "../../typescript/common";

import UploadVideoPage from "./UploadVideoPage";


type MapStateToPropsType = {
    user: IUser,
    token: string,
}

type MapDispatchToPropsType = {
    clearVideosAC: () => void
}

type OwnPropsType = {
    history: History,
}

type UploadVideoPageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const UploadVideoPageContainer: React.FC<UploadVideoPageContainerPropsType> = (
    {
        user,
        history,
        token,
        clearVideosAC
    }): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const [value, setValue] = useState<ValueType>({ title: "", description: "" });
    const [videoFile, setVideoFile] = useState<VideoFileType>({
        path: "",
        filename: "",
        thumbnail: {
            thumbsFilePath: "",
            fileDuration: ""
        }
    });

    const [info, setInfo] = useState<InfoType>({
        category: Category[0].label,
        privacy: VideoAccess[0].label
    });

    const handleChange: Handlers.ChangeType = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    };

    const handleChangeSelect = (name: string, value: string) =>
        setInfo({ ...info, [name]: value });

    const handleSubmit: Handlers.SubmitType = async e => {
        e.preventDefault();

        const data: IVideoData = {
            writer: user._id,
            title: value.title,
            description: value.description,
            privacy: info.privacy,
            category: info.category,
            filePath: videoFile.path,
            duration: Number(videoFile.thumbnail.fileDuration),
            thumbnail: videoFile.thumbnail.thumbsFilePath
        };

        const response = await VideoAPI.addVideo(data, token);

        if(response.data.success) {
            setValue({ title: "",  description: "" });

            setVideoFile({
                path: "",
                filename: "",
                thumbnail: {
                    thumbsFilePath: "",
                    fileDuration: ""
                }
            });

            setInfo({
                category: Category[0].label,
                privacy: VideoAccess[0].label,
            });

            clearVideosAC();
            history.push("/");
        }
    };

    const fetchData = async (type: string, file: string) => {
        const response = await VideoAPI.uploadFile({ type, file, token });
        setIsLoading(false);

        if(response.data.success) {
            setVideoFile(response.data.videoFile);
        }
    };

    const onDrop = (files: any) => {
        setIsLoading(true);
        fetchData("video-file", files[0]);
    };


    return <UploadVideoPage
        onSubmit={ handleSubmit }
        onDrop={ onDrop }
        onChange={ handleChange }
        value={ value }
        onChangeSelect={ handleChangeSelect }
        info={ info }
        thumbsFilePath={ videoFile.thumbnail.thumbsFilePath }
        isLoading={ isLoading }

    />
};

const mapStateToProps = ({ user }: AppStateType): MapStateToPropsType => ({
    user: user.user,
    token: user.token,
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { clearVideosAC: actions.clearVideosAC })
(UploadVideoPageContainer);