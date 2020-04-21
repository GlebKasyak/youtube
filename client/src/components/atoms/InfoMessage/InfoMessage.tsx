import React from "react";
import { Alert } from "antd";

import "./style.scss";

type InfoMessagePropsType = {
    title: string,
    description: string
}

const InfoMessage: React.FC<InfoMessagePropsType> = (
    {
        title,
        description
    }) => (
    <Alert
        message={ title }
        description={ description }
        type="info"
        showIcon
        className="info-message"
    />
);

export default InfoMessage;