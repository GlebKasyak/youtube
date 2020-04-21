import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
    image?: string,
    role?: string

    generateAuthToken(): Promise<string>
}

export interface IUserModel extends Model<IUserDocument>{
    findByCredentials(email: string, password: string): Promise<any>
}

export interface ILogin {
    user: object,
    token: string
}

