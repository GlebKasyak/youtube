import React from "react";
import { Typography, Button, Form, Input, Select } from "antd";

import { VideoAccess, Category } from "../../utils/videoSettings";
import "./style.scss";

import { Handlers } from "../../typescript/common";
import { ValueType, InfoType } from "../../typescript/video";

import { Dropzone, Thumbnail } from "../../components";


type UploadVideoPagePropsType = {
    onSubmit: Handlers.SubmitType,
    onDrop: (files: any) => void,
    onChange: Handlers.ChangeType,
    value: ValueType,
    onChangeSelect: (name: string, value: string) => any,
    info: InfoType,
    thumbsFilePath: string,
    isLoading: boolean
}

const UploadVideoPage: React.FC<UploadVideoPagePropsType> = (
    {
        onSubmit,
        onDrop,
        onChange,
        value,
        onChangeSelect,
        info,
        thumbsFilePath,
        isLoading
    }): JSX.Element => (
    <div className="container upload-video-container">
        <Typography.Title className="upload-video-container__title" level={2} >Upload Video</Typography.Title>

        <Form onSubmit={ onSubmit } className="upload-video-form" >
            <div className="upload-video-form__inside-container">
                <Dropzone onDrop={ onDrop } />
                <Thumbnail path={ thumbsFilePath } isLoading={ isLoading } />
            </div>

            <Form.Item label="Title" >
                <Input
                    name="title"
                    onChange={ onChange }
                    value={ value.title }
                    maxLength={ 50 }
                />
            </Form.Item>
            <Form.Item label="Description" >
                <Input.TextArea
                    name="description"
                    onChange={ onChange }
                    maxLength={ 100 }
                    value={ value.description }
                />
            </Form.Item>

            <div className="select-wrapper">
                <Select value={ info.privacy } onChange={ onChangeSelect.bind(null, "privacy") } className="upload-video-form__select" >
                    { VideoAccess.map((item, index) => (
                        <Select.Option key={ index } value={ item.value }>{ item.label }</Select.Option>
                    )) }
                </Select>
                <Select value={ info.category } onChange={ onChangeSelect.bind(null, "category") } className="upload-video-form__select" >
                    { Category.map(item => (
                        <Select.Option key={ item.label } value={ item.label }>{ item.label }</Select.Option>
                    )) }
                </Select>
            </div>

            <Button type="primary" htmlType="submit" size="large" >
                Submit
            </Button>

        </Form>
    </div>
);

export default UploadVideoPage;
