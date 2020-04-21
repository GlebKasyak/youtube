import React from "react";
import Icons from "../../../utils/icons";

type TextWithIconPropsType = {
    onClick: () => void,
    text: string,
    isOpen: boolean,
    className: string
}

const TextWithIcon: React.FC<TextWithIconPropsType> = (
    {
        onClick,
        text,
        isOpen,
        ...props
    }) => (
    <p onClick={ onClick } {...props} >
        { isOpen
            ? <Icons.CaretUpOutlined />
            : <Icons.CaretDownOutlined />
        }
        { text }
    </p>
);

export default TextWithIcon;