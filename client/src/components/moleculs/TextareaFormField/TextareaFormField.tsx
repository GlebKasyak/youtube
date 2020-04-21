import React from "react";
import { Form, Input } from "antd";
import { FormComponentProps, ValidationRule } from "antd/lib/form";

interface ITextareaFormFieldProps extends FormComponentProps {
    labelField: string,
    nameField: string,
    rules: [ValidationRule],
    initialValue?: string,
    onBlur?: () => void,
}

const TextareaFormField: React.FC<ITextareaFormFieldProps> = (
    {
        labelField,
        nameField,
        rules,
        initialValue,
        onBlur,
        form
    }) => (
    <Form.Item hasFeedback label={ labelField } >
        { form.getFieldDecorator(nameField , {
            rules,
            initialValue
        })(
            <Input.TextArea
                rows={4}
                placeholder={ labelField }
                onBlur={ onBlur }
            />
        )}
    </Form.Item>
);

export default TextareaFormField;