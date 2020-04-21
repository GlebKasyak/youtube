import { createTransport, Transporter, SendMailOptions } from "nodemailer";

import { ADMIN_EMAIL } from "../config";
import { IMessage } from "../interfaces/mailInterface";
import template from "./../utils/templateForMessage";

export default class MailService {
    constructor() {}

    static sendMail: IMessage = async (authorEmil, authorPassword, title, text) => {
        try {
            let transporter: Transporter = createTransport({
                host: `smtp.${ authorEmil.split("@")[1] }`,
                port: 587,
                secure: false,
                auth: {
                    user: authorEmil,
                    pass: authorPassword
                }
            });

            let options: SendMailOptions = {
                from: `From ${ authorEmil }`,
                to: ADMIN_EMAIL,
                subject: `Message from youtube`,
                text,
                html: template(title, text)
            };

            await transporter.sendMail(options);
        } catch (err) {
            throw new Error(err)
        }
    };
}
