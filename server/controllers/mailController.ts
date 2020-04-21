import { RequestHandler } from "express";


import MailService from "../services/mailService";

class SubscribeController {
    constructor() {}

    static sendMail: RequestHandler = async (req, res) => {
        try {
            const { password, email, message, title } = req.body;
            await MailService.sendMail(email, password, title, message);

            res.json({ message: `Your message has been sent successfully. Sender ${ email }`, success: true });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    }
}

export default SubscribeController