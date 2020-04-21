import React from "react";
import { Alert } from "antd";

type SuccessMessagePropsType = {
    text: string
}

const SuccessMessage: React.FC<SuccessMessagePropsType> = ({ text }) => (
    <Alert
        message="Success"
        description={ text }
        type="success"
        closable
        showIcon
    />
);

export default SuccessMessage;