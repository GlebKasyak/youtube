import React from "react";
import moment from "moment";
import { Card, Avatar, Col } from "antd";
import cn from "classnames";

import { setAvatar } from '../../../utils/helpers';
import { getVideoDuration, videoCardLayouts } from "../../../utils/videoSettings";
import "./style.scss";

import { IVideo } from "../../../typescript/video";

type VideoCardPropsType = {
    video: IVideo,
    page: "detailPage" | "defaultLayouts"
};

const VideoCard: React.FC<VideoCardPropsType> = ({ video, page }) => {
    const { minutes, seconds } = getVideoDuration(video.duration!);

    return (
      <Col { ...videoCardLayouts[page] } className={cn("video-card", {"detail-page": page === "detailPage"})} >
          <div className="video-card-image-wrapper" >
              <a href={`/video/${ video._id }`} >
                  <img
                      src={`http://localhost:3333/${ video.thumbnail }`}
                      className="video-card-image-wrapper__image"
                      alt="thumbnail"
                  />
                  <div className="video-card-image-wrapper__duration">
                      <span>{ minutes } : { seconds }</span>
                  </div>
              </a>
          </div>
          <div className="video-card__info">
              <Card.Meta
                  avatar={
                      <Avatar className="video-card__avatar" src={ setAvatar(video.writer && video.writer.image!) } />
                  }
                  title={ <span className="video-card__title">{ video.title }</span> }
              />
              <span className="video-card__name" >Author: { video.writer && video.writer.firstName } </span><br />
              <span className="video-card__views" > { video.views } view(s)</span>
              <span className="video-card__date"> { moment(video.createdAt).format("MMM Do YY") } </span>
          </div>
      </Col>
    )
};

export default VideoCard;