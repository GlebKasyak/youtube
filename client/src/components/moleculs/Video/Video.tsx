import React, { useState, useRef, useEffect } from "react";
import { SERVER_URL } from "../../../utils/constants";

import "./style.scss";

type VideoPropsType = {
    filePath: string,
    duration: number,
    videoId: string,
    setViewVideo: (data: { videoId: string }) => void
}

const Video: React.FC<VideoPropsType> = (
    {
        filePath,
        duration,
        videoId,
        setViewVideo
    }) => {
    const videoElem = useRef<HTMLVideoElement | null>(null);

    const [isView, setIsView] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const setView = (duration: number, currentTime: number) => {
        if((Math.ceil(Number(duration))) / (Math.ceil(Number(currentTime))) <= 2) {
            setIsView(true);
        }
    };

    useEffect(() => {
        if(currentTime === 0) {
            setIsView(false);
            setIsSend(false);
        }

        setView(duration, currentTime);

        if(isView && !isSend) {
            setViewVideo({ videoId });
            setIsSend(true);
            setIsSend(true);
        }
        
    }, [isSend, isView, currentTime, duration, setViewVideo, videoId]);
    
    return (
      <video
          onEnded={ () => setCurrentTime(0) }
          onTimeUpdate={ () => setCurrentTime(videoElem.current!.currentTime) }
          ref={ videoElem }
          className="video"
          src={`${ SERVER_URL }/${ filePath }`}
          controls
      />
    )
};

export default Video;