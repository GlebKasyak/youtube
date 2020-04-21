import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import { Typography, Row } from 'antd';

import { getVideos } from "../../redux/actions/video.actions";
import { useVideo } from "../../hooks"
import "./style.scss";

import { AppStateType } from "../../redux/reducers";
import { IVideo, GetVideosDataType } from "../../typescript/video";

import { Preloader, VideoCard, InfoMessage } from "../../components";

type MapStateToPropsType = {
    videos: IVideo[],
    isSearching: boolean,
    userId: string
}

type MapDispatchToPropsType = {
    getVideos: (data: GetVideosDataType) => any,
}

type HomePagePropsType = MapStateToPropsType & MapDispatchToPropsType;

const Home: React.FC<HomePagePropsType> = (
    {
        videos,
        isSearching,
        getVideos,
        userId
    }): JSX.Element => {
    const [isLoading, hasMore, handleScroll] = useVideo(getVideos, isSearching, userId, videos.length);

    if(isLoading) return <Preloader text="Please wait. videos are loading ..." />;

    return (
        <div className="container">
            <Typography.Title level={2} >All videos</Typography.Title>
            <Row gutter={16}>
                <InfiniteScroll
                    next={ handleScroll }
                    hasMore={ hasMore }
                    loader={ <Preloader text="Loading..." modificator="scroll-loader" /> }
                    dataLength={ videos.length }
                >
                    { !!videos.length
                        ? videos.map(video => <VideoCard page="defaultLayouts" video={ video } key={ video._id } />)
                        : <InfoMessage
                            title="Information"
                            description="Video list is empty"
                        />
                    }
                </InfiniteScroll>
            </Row>
        </div>
    );
};


const mapStateToProps = ({ video, user }: AppStateType): MapStateToPropsType => ({
    userId: user.user._id,
    videos: video.videos,
    isSearching: video.isSearching
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getVideos })
(Home);