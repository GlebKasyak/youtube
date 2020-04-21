import { Schema, model } from "mongoose";
import { NextFunction } from "express";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { Comment, Dislike, Video, Like, Subscribe } from "./";
import { IUserDocument, IUserModel } from "../interfaces/userIinterface";

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    secondName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        min: 4,
        trim: true
    },
    image: String,
    role: {
        type: String,
        default: "user"
    },

}, {
    timestamps: true
});

userSchema.pre("save", async function(next: NextFunction): Promise<void> {
    const user: any = this;

    if(user.isModified("password")) {
        user.password = await hash(user.password, 15);
    }

    next();
});

userSchema.post("remove", async function(user: IUserDocument): Promise<void> {
    await Comment.deleteMany({ writer: user._id }).populate("writer");
    await Video.deleteMany({ writer: user._id }).populate("writer");
    await Dislike.deleteMany({ userId: user._id }).populate("userId");
    await Like.deleteMany({ userId: user._id }).populate("userId");
    await Subscribe.deleteMany({ userFrom: user._id }).populate("userFrom");
});

userSchema.statics.findByCredentials = async (email: string, password: string): Promise<any> => {
    const user: IUserDocument | null = await User.findOne({ email });

    if(!user) {
        throw new Error("Incorrect data during sign in system");
    }

    const isMatch: boolean = await compare(password, user.password);
    if(!isMatch) {
        throw new Error("Password is incorrect, please try again");
    }

    return user;
};

userSchema.methods.generateAuthToken = async function(): Promise<string> {
    const user: any = this;
    return sign({ userId: user._id }, "secret");
};


const User: IUserModel = model<IUserDocument, IUserModel>("User", userSchema);
export default User;
