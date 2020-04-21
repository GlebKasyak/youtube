import { RequestHandler } from "express";

import SubscribeService from "../services/subscribeService";


class SubscribeController {
    constructor() {}

    static getSubscribeInfo: RequestHandler = async (req, res) =>  {
        try {
            const subscriptionInformation = await SubscribeService.getSubscribeInfo(req.body);

            res.json({   message: "Subscription information", success: true, subscriptionInformation })
        } catch(err) {
            res.status(400).json({ message: err.message, success: false })
        }
    };

    static subscribe: RequestHandler = async (req, res) =>  {
        try {
            const subscribeInfo = await SubscribeService.subscribe(req.body);

            res.status(201).json({ message: "You are subscribed", success: true, subscribeInfo })
        } catch(err) {
            res.status(400).json({ message: err.message, success: false })
        }
    };

    static unSubscribe: RequestHandler = async (req, res) =>  {
        try {
            const subscribeInfo = await SubscribeService.unSubscribe(req.body);

            res.status(201).json({ message: "You are subscribed", success: true, subscribeInfo })
        } catch(err) {
            res.status(400).json({ message: err.message, success: false })
        }
    };
}

export default SubscribeController