import React from "react";
import Dropzone, { DropEvent } from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";

import "./style.scss";

type DropzoneComponentPropsType = {
    onDrop: <T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent) => void
}

const DropzoneComponent: React.FC<DropzoneComponentPropsType> = ({ onDrop }) => (
    <Dropzone
        onDrop={ onDrop }
        multiple={ false }
        maxSize={ 800000000 } >
        {({ getRootProps, getInputProps }) => (
            <div
                className="dropzone"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <PlusOutlined className="dropzone__icon" />
            </div>
        )}
    </Dropzone>
);

export default DropzoneComponent;
