import instance from "./api";

import { MessageDataType } from "../typescript/message";


export class MessageAPI {
    static sendMail = (data: MessageDataType) => {
        return instance.post("/mail", data);
    }
}
