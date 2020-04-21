import React, { useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import LoginForm from "./LoginForm";
import { login } from "../../redux/actions/user.actions";

import { ErrorMessage, Preloader, Recaptcha } from "../../components";
import { storageKeys } from "../../utils/constants";
import rememberMe from "../../utils/rememberMe";

import { AppStateType } from "../../redux/reducers";
import { Handlers, FieldsType } from "../../typescript/common";
import { IUser, LoginDataType } from "../../typescript/user";

type MapStateToPropsType = {
    user: IUser,
    token: string
}

type MapDispatchToPropsType = {
   login: (data: LoginDataType) => any
}

type LoginFormContainer = MapStateToPropsType & MapDispatchToPropsType & FormComponentProps;

const LoginFormContainer: React.FC<LoginFormContainer> = memo((
    {
        user,
        token,
        form,
        login
    }) => {
    const [recaptchaResponse, setRecaptchaResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const userDataFromLocalStorage = localStorage.getItem(storageKeys.isRememberMe);

    const fetchData = async (data: LoginDataType) => {
        setIsLoading(true);
        rememberMe(form, JSON.stringify(data));

        const response = await login(data);

        if(!response.success) setErr(response.message);
        setIsLoading(false);
        form.resetFields();
    };

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        form.validateFields((err: Error) => {
            if(!err) {
                const { email, password } = form.getFieldsValue();
                fetchData({ email, password, captcha: recaptchaResponse });
            }
        });
    };

    useEffect(() => {
        if(user.isAuth) {
            localStorage.setItem(storageKeys.isAuth, JSON.stringify(user.isAuth));
            localStorage.setItem(storageKeys.userInfo, JSON.stringify(
                { token, userId: user._id, role: user.role })
            );
        }
    }, [user.isAuth,  user._id, token, user.role]);

    useEffect(() => {
        if(userDataFromLocalStorage && !isLoading) {
            form.setFieldsValue({ "isRememberMe": true })
        }
    }, [userDataFromLocalStorage, isLoading]);


    const getLoginFormFields = () => {
        let values = [];

        if(userDataFromLocalStorage) {
            let dataAfterParse = JSON.parse(userDataFromLocalStorage);

            for(let [key, value] of  Object.entries(dataAfterParse)) {
                values.push({ [key]: value })
            }
        }

        return setLoginFormFields(values);
    };

    if(isLoading) return <Preloader text="Authorization...Please wait" />;

    return (
        <>
            { err && <ErrorMessage text={ err } /> }
            <LoginForm
                form={ form }
                onSubmit={ handleSubmit }
                loginFormFields={ getLoginFormFields() }
            />
            <Recaptcha
                verifyCallback={ response => setRecaptchaResponse(response) }
            />
        </>
    )
});

type InitialValueType = {
    [key: string]: any
};

const setLoginFormFields = (initialValues: Array<InitialValueType>) => {
    const fields: Array<FieldsType> = [
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
            rules: [{ required: true, message: "Minimum length 5!", min: 5 }],
            iconType: "lock"
        },
    ];

    fields.map(field =>
        initialValues.forEach(value => {
            if(value[field.nameField]) {
                field.initialValue = value[field.nameField] || ""
            }
        })
    );

    return fields;
};

const mapStateToProps = ({ user } : AppStateType) => ({
    user: user.user,
    token: user.token
});

const LoginFormComponent = Form.create()(LoginFormContainer);

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { login })
(LoginFormComponent);