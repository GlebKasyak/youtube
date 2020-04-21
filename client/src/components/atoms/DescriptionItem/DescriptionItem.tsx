import React from "react";

import "./style.scss";

type DescriptionItemPropsType = {
    title: string,
    content?: string
}

const DescriptionItem: React.FC<DescriptionItemPropsType> = (
    {
        title,
        content
    }) => (
    <div className="description-item" >
        <p className="description-item__title" >
            { title }:
        </p>
        { content }
    </div>
);

export default DescriptionItem;