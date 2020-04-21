import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default (onOk: () => void) => (
    Modal.confirm({
        title: "Do you Want to delete this account?",
        icon: <ExclamationCircleOutlined />,
        onOk() { onOk() },
    })
)
