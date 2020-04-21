import React from "react";
import { List, Avatar, Row, Col } from "antd";

import { setAvatar, shortenStringLength } from '../../utils/helpers';
import "./style.scss";

import { storageKeys } from "../../utils/constants";
import { IVideo } from "../../typescript/video";

import { VideoCard, LikeDislike, Video, PopoverComponent } from "../../components";
import Subscriber from "./Subscriber/SubscriberContainer";
import Comments from "./Comments/CommentsContainer";

type DetailVideoPagePropsType = {
    video: IVideo,
    videos: Array<IVideo>,
    userId: string,
    setViewVideo: (data: { videoId: string }) => void
}

const DetailVideoPage: React.FC<DetailVideoPagePropsType> = (
    {
        video,
        videos,
        userId,
        setViewVideo
    }): JSX.Element => (
    <Row className="detail-page-container">
        <Col lg={16} xs={24} >
            <div className="video-detail-page" >
                <Video
                    filePath={ video.filePath }
                    duration={ video.duration! }
                    videoId={ video._id! }
                    setViewVideo={ setViewVideo }
                />

                <List.Item
                    actions={
                        [
                            <LikeDislike itemName="videoId" itemId={ video._id! } userId={ userId } />,
                            <Subscriber
                                userTo={ video.writer._id! }
                                userFrom={ JSON.parse(localStorage.getItem(storageKeys.userInfo) || "").userId }
                            />]
                    }
                >
                    <List.Item.Meta
                        avatar={ <Avatar src={ video.writer && setAvatar(video.writer.image!) } /> }
                        title={ <span className="video-detail-page__title">{ video.title }</span> }
                        description={
                            <div className="video-detail-page__description" >
                                <span>{ shortenStringLength(video.description) }</span>
                                <p className="video-detail-page__views" >{ video.views } view(s)</p>
                                <PopoverComponent description={ video.description } title={ video.title } />
                            </div>
                        }
                    />
                </List.Item>

                <Comments postId={ video._id! } />

            </div>
        </Col>
        <Col lg={8} xs={24} className="video-detail-page__videos" >
            { videos.map(video => {
                return <VideoCard page="detailPage" key={ video._id } video={ video } />
            }) }
        </Col>
    </Row>
);

export default DetailVideoPage;