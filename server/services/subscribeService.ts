import { Subscribe } from "./../models";
import { ISubscribeDocument } from "../interfaces/subscribeInterface";

export default class SubscribeService {
    constructor() {}

    static getSubscribeInfo = async (body: ISubscribeDocument) => {
        const { userTo, userFrom } = body;
        let result = false;

        const subscribers = await Subscribe.find({ userTo });
        const subscribe = await Subscribe.find({ userTo, userFrom });

        if(!!subscribe.length) result = true;
        return { subscribers: subscribers.length, subscribed: result };
    };

    static subscribe = async (data: ISubscribeDocument): Promise<ISubscribeDocument> => {
        const result = await Subscribe.create(data);
        if(!result) throw new Error("Error. Please you try again");

        return result;
    };

    static unSubscribe = async (data: ISubscribeDocument): Promise<ISubscribeDocument> => {
        const result = await Subscribe.findOneAndDelete(data);
        if(!result) throw new Error("Error. Please you try again");

        return result;
    };
}