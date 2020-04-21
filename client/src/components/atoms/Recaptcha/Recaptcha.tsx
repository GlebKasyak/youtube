import React from "react";
import Recaptcha from "react-recaptcha";

import { CAPTCHA_CLIENT_KEY } from "../../../utils/constants";

import "./style.scss";

type RecaptchaComponentPropsType = {
    verifyCallback: (response: string) => void
};

const RecaptchaComponent: React.FC<RecaptchaComponentPropsType> = (
    { verifyCallback }) => (
    <Recaptcha
        verifyCallback={ verifyCallback }
        sitekey={ CAPTCHA_CLIENT_KEY }
        className="captcha"
        render="explicit"
    />
);

export default RecaptchaComponent;