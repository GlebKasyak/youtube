import instance from "./api";

import { SubscribeDataType } from "../typescript/subscribeInfo";

export class SubscribeAPI {
    static getSubscribeInfo = (data: SubscribeDataType) => {
        return instance.post("/subscribe", data)
    };

    static subscribe = (data: SubscribeDataType) => {
        return instance.post("/subscribe/subscribe", data)
    };

    static unSubscribe = (data: SubscribeDataType) => {
        return instance.post("/subscribe/us-subscribe", data)
    };
}