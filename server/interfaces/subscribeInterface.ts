import { Document } from "mongoose";

export interface ISubscribeDocument extends Document {
    userTo: string,
    userFrom: string
}
