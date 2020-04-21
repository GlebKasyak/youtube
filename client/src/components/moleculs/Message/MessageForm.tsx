import React, { useState } from "react";
import { Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";

import { InputFormField, TextareaFormField } from "./../../";

import { MessageAPI } from "../../../core/messageAPI";

import { MessageDataType } from "../../../typescript/message";
import { SetStateType, Handlers, FieldsType } from "../../../typescript/common";


interface IMessageFormComponentProps extends FormComponentProps {
    setErrorMessage: SetStateType<string | null>,
    setSuccessMessage: SetStateType<string | null>
}

const MessageFormComponent: React.FC<IMessageFormComponentProps> = (
    {
        form,
        setErrorMessage,
        setSuccessMessage
    }) => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (data: MessageDataType) => {
     try {
         setIsLoading(true);
         const response = await MessageAPI.sendMail(data);
         response.data.success && setSuccessMessage(response.data.message!);

         setIsLoading(false);
         form.resetFields();
     } catch (err) {
         setErrorMessage(err.response.data.message!);
         setIsLoading(false);
     }
    };

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        form.validateFields((err: Error) => {
          if(!err) {
            const { email, password, title, message } = form.getFieldsValue();
            fetchData({ email, password, title, message });
          }
        });
    };

    return (
      <Form onSubmit={ handleSubmit } layout="horizontal" >
        { messageInputFormFields.map((field: FieldsType) =>
            <InputFormField
                key={ field.nameField }
                { ...field }
                form={ form }
            />
        ) }
        { messageTextareaFormFields.map((field: FieldsType) =>
            <TextareaFormField
                key={ field.nameField }
                { ...field }
                form={ form }
            />
        ) }
        <Form.Item className="right">
          <Button
              loading={ isLoading }
              type="primary"
              htmlType="submit"
          >
            Send message
          </Button>
        </Form.Item>
      </Form>
    )
};

const messageInputFormFields: FieldsType[] = [
    {
      labelField: "Email",
      nameField: "email",
      type: "email",
      rules: [{ required: true, message: "Please input your email!", type: "email" }],
      iconType: "mail"
    },
    {
      labelField: "Password",
      nameField: "password",
      type: "password",
      rules: [{ required: true, message: "Enter the password" }],
      iconType: "lock"
    },
    {
      labelField: "Title",
      nameField: "title",
      rules: [{
          required: true,
          message: "Minimum length 4! Maximum length 30",
          min: 4,
          max: 30
      }],
      iconType: "exclamation"
    }
];

const messageTextareaFormFields: FieldsType[] = [
  {
    labelField: "Message",
    nameField: "message",
    rules: [{
        required: true,
        message: "Minimum length 5! Maximum length 200",
        min: 5,
        max: 200
    }],
    iconType: "message"
  }
];

export default Form.create<IMessageFormComponentProps>()(MessageFormComponent);