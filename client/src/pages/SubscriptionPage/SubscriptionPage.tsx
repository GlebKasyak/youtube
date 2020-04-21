import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import { Row, Typography } from "antd";

import { getSubscriptionVideos } from "../../redux/actions/video.actions";
import { useVideo } from "../../hooks"

import { AppStateType } from "../../redux/reducers";
import { IVideo, GetVideosDataType } from "../../typescript/video";

import { InfoMessage, Preloader, VideoCard } from "../../components"


type MapStateToPropsType = {
    videos: Array<IVideo>,
    isSearching: boolean,
    userId: string
}

type MapDispatchToPropsType = {
    getSubscriptionVideos: (data: GetVideosDataType) => any
}

type SubscriptionPagePropsType = MapStateToPropsType & MapDispatchToPropsType;

const SubscriptionPage: React.FC<SubscriptionPagePropsType> = (
    {
        videos,
        isSearching,
        getSubscriptionVideos,
        userId
    }): JSX.Element => {

    const [isLoading, hasMore, handleScroll] = useVideo(getSubscriptionVideos, isSearching, userId, videos.length);

    if(isLoading) return <Preloader text="Please wait. videos are loading ..." />;

    return (
        <div className="container">
            <Typography.Title level={2} >Subscribed Video</Typography.Title>
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
    )
};

const mapStateToProps = ({ video, user }: AppStateType): MapStateToPropsType => ({
    userId: user.user._id,
    videos: video.subscriptionVideos,
    isSearching: video.isSearching
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getSubscriptionVideos })
(SubscriptionPage);