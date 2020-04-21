import React from "react";
import { Spin } from "antd";

import "./style.scss";

type PreloaderPropsType = {
    text: string,
    modificator?: string
}

const Preloader: React.FC<PreloaderPropsType> = (
    {
        text,
        modificator
    }) => (
    <Spin
        tip={ text }
        className={`preloader preloader--${ modificator }`}
        size="large"
    />
);

export default Preloader;