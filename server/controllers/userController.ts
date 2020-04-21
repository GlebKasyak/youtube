import { RequestHandler } from "express";

import UserService from "../services/userService";
import { IUserDocument } from "../interfaces/userIinterface";


class UserController {
    constructor() {}

    static login: RequestHandler = async (req, res) => {
        try {
            const { email, password } = req.body;
            const { user, token } = await UserService.login(email, password);

            res.cookie("x_auth", token)
                .json({ message: "Token is created", success: true, user, token });
        }  catch (err) {
            res.status(400).json({ message: "Error. Email or password incorrect", success: false, err })
        }
    };

    static logout: RequestHandler = async(req, res) => {
        try {
            res.clearCookie("x_auth").json({ message: "You are logout", success: true });
        } catch (err) {
            res.status(400).json({ message: "Error. Can you try again", err })
        }
    };

    static register: RequestHandler = async (req, res) =>{
        try {
            const { email, password } = req.body;
            const user: IUserDocument = await UserService.register(email, password, { ...req.body } );

            res.status(201).json({ message: "User is created", success: true, user });
        } catch (err) {
            res.status(400).json({ message: "Error. User is not created", success: false, err })
        }
    };

    static auth: RequestHandler = async (req, res) => {
        try {
            res.json({ message: "You are authenticated", user: req.user, token: req.token, success: true });
        } catch (err) {
            res.status(400).json({ message: "Error. Can you try again", err })
        }
    };

    static uploadImage: RequestHandler = async (req, res) => {
        try {
            const result: IUserDocument = await UserService.uploadImage(req.files[req.name][0], req.user.email);

            res.json({ message: "Video is updated", success: true, image: result.image });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false })
        }
    };

    static removeUser: RequestHandler = async (req, res) => {
        try {
            const { _id, email } = req.user;
            await UserService.removeUser(_id, email);

            res.json({ message: "Account is deleted", success: true });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false })
        }
    };

    static getUsers: RequestHandler = async (req, res) => {
        try {
            const users: IUserDocument[] = await UserService.getUsers(req.query);

            res.json({ message: "All users", success: true, users });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false })
        }
    };

    static removeUserById: RequestHandler = async (req, res) => {
        try {
            const { userId, email } = req.query;
            await UserService.removeUser(userId, email);

            res.json({ message: "User is deleted!", success: true });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false })
        }
    };

}

export default UserController;