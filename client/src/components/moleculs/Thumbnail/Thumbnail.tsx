import React from "react";
import Preloader from "../../atoms/Preloader/Preloader";

import defaultImage from "./../../../images/default-image.png";
import "./style.scss";


type ThumbnailPropsType = {
    path: string,
    isLoading: boolean
}

const Thumbnail: React.FC<ThumbnailPropsType> = ({ path, isLoading }) => (
    <div className="thumbnail" >
        { isLoading
            ? <Preloader text="Please wait. Video is uploading..." />
            : <Image path={ path } />
        }
    </div>
);


type ImagePropsType = {
    path: string
}

const Image: React.FC<ImagePropsType> = ({ path }) => {
    return path
        ? <img src={`http://localhost:3333/${ path }`} alt="video-thumbnail" className="thumbnail__image"  />
        : <img src={ defaultImage } alt="video-thumbnail" className="thumbnail__image" />
};

export default Thumbnail;