import React, { ReactNode } from "react";
import { Empty } from "antd";

import "./style.scss";

type EmptyComponentPropsType = {
    description: string | ReactNode
}

const EmptyComponent: React.FC<EmptyComponentPropsType> = ({ description }) =>
    <Empty description={ description } />;

export default EmptyComponent;
