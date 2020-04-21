import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

import { User } from "../models";
import { DecodedDataType } from "../interfaces/common";

const admin: RequestHandler = async (req, res, next) => {
    if(req.method === "OPTIONS") return next();

    try {
        const header = req.header("Authorization");
        if(!header) throw new Error("Authorization header is absent");

        const token = header.replace("Bearer ", "");
        // const token: string = req.cookies.x_auth;
        if(!token) throw new Error;

        try {
            const decoded = await verify(token, "secret") as DecodedDataType;
            const user = await User.findById(decoded.userId).select("-password -updatedAt");

            if(!user) throw new Error("there is no such user");

            if(user.role !== "admin") {
                throw new Error("You have not admin root");
            }
            req.user = user;
            next();
        } catch (err) {
            return res.status(401).json({ message: "No authorization", err });
        }

    } catch (err) {
        res.status(401).json({ message: "No authorization", err });
    }
};

export default admin;