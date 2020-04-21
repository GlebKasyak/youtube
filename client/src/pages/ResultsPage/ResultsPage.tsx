import React from "react";
import { connect } from "react-redux";
import { Typography, Row } from "antd";

import { AppStateType } from "../../redux/reducers";
import { IVideo } from "../../typescript/video";

import { Preloader, VideoCard, InfoMessage } from "../../components";

type MapStateToPropsType = {
    videos: IVideo[],
    isSearching: boolean
}

type ResultsPagePropsType = MapStateToPropsType;

const ResultsPage: React.FC<ResultsPagePropsType> = ({ videos, isSearching }): JSX.Element => {

    if(isSearching) return <Preloader text="Please wait. videos are loading ..." />;

    return (
        <div className="container">
            <Typography.Title level={2} >All videos</Typography.Title>
            <Row gutter={16}>
                { !!videos.length
                    ? videos.map(video => <VideoCard page="defaultLayouts" video={ video } key={ video._id } />)
                    : <InfoMessage
                        title="Information"
                        description="Video list is empty"
                    />
                }
            </Row>
        </div>
    );
};


const mapStateToProps = ({ video }: AppStateType): MapStateToPropsType => ({
    videos: video.searchVideos,
    isSearching: video.isSearching
});

export default connect<MapStateToPropsType, null, {}, AppStateType>(
    mapStateToProps,
    null)
(ResultsPage);