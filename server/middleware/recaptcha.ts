import { RequestHandler } from "express";
import { RECAPTCHA_KEY } from "../config";
import request from "request-promise";

const recaptcha: RequestHandler = async (req, res, next) => {
    try {
        if(!req.body.captcha) {
            return res.status(409).json({ message: "Please select captcha", success: false });
        }

        try {
            const verifyUrl: string = `https://www.google.com/recaptcha/api/siteverify?secret=${ RECAPTCHA_KEY }&response=${ req.body.captcha }`;
            const response = await request(verifyUrl);

            if(!JSON.parse(response).success) throw new Error("Failed captcha verification");
        
            next();
        } catch (err) {
            return res.status(409).json({ message: "Failed captcha verification", success: false });
        }

    } catch (err) {
        res.status(409).json({ message: err.messsage, success: false });
    }
};

export default recaptcha;