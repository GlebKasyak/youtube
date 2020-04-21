import React, { useState, useEffect, useCallback } from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";
import { match } from "react-router-dom";
import { connect } from "react-redux";

import { getVideoDetail, getVideos, setViewVideo } from "../../redux/actions/video.actions";
import { getCommentsByPostId } from "../../redux/actions/comment.action";
import "./style.scss";

import { AppStateType } from "../../redux/reducers";
import { VideoState, GetVideosDataType } from "../../typescript/video";

import { Preloader } from "../../components";
import DetailVideoPage from "./DetailVideoPage";

type MatchType = { videoId: string };

type MapStateToPropsType = {
    userId: string,
    video: VideoState,
};

type MapDispatchToPropsType = {
    getVideoDetail: (id: string) => void,
    getVideos: (data: GetVideosDataType) => any,
    getCommentsByPostId: (postId: string) => void,
    setViewVideo: (data: { videoId: string }) => void
};

type OwnPropsType = {
    match: match<MatchType>
};

type DetailVideoPageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const DetailVideoPageContainer: React.FC<DetailVideoPageContainerPropsType> = (
    {
        userId,
        match,
        getVideoDetail,
        video,
        getVideos,
        getCommentsByPostId,
        setViewVideo
    }): JSX.Element => {
    const { videoId } = match.params;
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async (videoId: string, token: CancelToken, userId: string): Promise<void> => {
        try {
            await getVideoDetail(videoId);
            await getVideos({ token, userId });
            await getCommentsByPostId(videoId);

            setIsLoading(false);
        } catch (err) {
            axios.isCancel(err);
        }
    }, [getVideoDetail, getVideos, setIsLoading, getCommentsByPostId]);

    useEffect(() => {
        const signal: CancelTokenSource = axios.CancelToken.source();
        if (userId) fetchData(videoId, signal.token, userId);

        return function cleanup() {
            signal.cancel("Api is being canceled");
        }
    }, [videoId, fetchData, userId]);

    return isLoading
        ? <Preloader text="Videos are loading...."/>
        : ( <DetailVideoPage
            video={ video.video! }
            videos={ video.videos }
            userId={ userId }
            setViewVideo={ setViewVideo }
        /> );
};

const mapStateToProps = ({ user, video }: AppStateType): MapStateToPropsType => ({
    userId: user.user._id,
    video
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { getVideoDetail, getVideos, getCommentsByPostId, setViewVideo })
(DetailVideoPageContainer)

