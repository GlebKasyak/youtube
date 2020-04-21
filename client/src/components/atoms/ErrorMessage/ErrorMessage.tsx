import React, { CSSProperties } from "react";
import { Alert } from "antd";

import "./style.scss";

type ErrorMessagePropsType = {
    text: string,
    style?: CSSProperties
};

const ErrorMessage: React.FC<ErrorMessagePropsType> = (
    {
        text,
        style
    }) => (
    <Alert
        className="error-message"
        message="Error"
        description={ text }
        type="error"
        showIcon
        closable
        style={ style }
    />
);

export default ErrorMessage;