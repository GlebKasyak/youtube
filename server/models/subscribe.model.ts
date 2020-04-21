import { Schema, model, Types } from "mongoose";
import { ISubscribeDocument } from "../interfaces/subscribeInterface";

const subscribeSchema: Schema = new Schema({
    userTo: {
        type: Types.ObjectId,
        ref: "User"
    },
    userFrom: {
        type: Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

export default model<ISubscribeDocument>("Subscriber", subscribeSchema);