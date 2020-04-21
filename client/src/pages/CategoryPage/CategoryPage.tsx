import React from "react";
import { connect } from "react-redux";
import { Typography, Row, Tag } from "antd";
import cn from "classnames";

import { AppStateType } from "../../redux/reducers";
import { IVideo } from "../../typescript/video";

import { Preloader, VideoCard, InfoMessage } from "../../components";
import "./style.scss";

type MapStateToPropsType = {
    videos: Array<IVideo>,
    categoryType: string,
    isSearching: boolean
}

type CategoryPageType = MapStateToPropsType;

const CategoryPage: React.FC<CategoryPageType> = ({ videos, categoryType, isSearching }): JSX.Element => {

    if(isSearching) return <Preloader text="Please wait. videos are loading ..." />;

    return (
        <div className="container" >
         <div className="category-page" >
             <Typography.Title level={2} className="category-page__title" >
                 Videos by category
                 <Tag className={ cn("tag", {"tag--hide": !categoryType}) } color="blue">{ categoryType }</Tag>
             </Typography.Title>
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
        </div>
    );
};

const mapStateToProps = ({ video }: AppStateType): MapStateToPropsType => ({
    videos: video.videosByCategory,
    categoryType: video.categoryType!,
    isSearching: video.isSearching
});

export default connect<MapStateToPropsType, null, {}, AppStateType>(
    mapStateToProps, null)
(CategoryPage);