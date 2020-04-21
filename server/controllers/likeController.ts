import { RequestHandler } from "express";

import LikeDislikeService from "../services/likeService";

class LikeController {
    constructor() {}

    static getLikes: RequestHandler = async (req, res) => {
        try {
            const likes = await LikeDislikeService.getLikes(req.query);

            res.json({ message: "All likes", success: true, likes });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static getDislikes: RequestHandler = async(req, res) => {
        try {
            const dislikes = await LikeDislikeService.getDislikes(req.query);

            res.json({ message: "All dislikes", success: true, dislikes });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static upLike: RequestHandler = async (req, res) => {
        try {
            const like = await LikeDislikeService.upLike(req.query);

            res.json({ message: "Add like", success: true, like });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static unLike: RequestHandler = async(req, res) => {
        try {
            await LikeDislikeService.unLike(req.query);

            res.json({ message: "Like in deleted", success: true });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static unDisLike: RequestHandler = async(req, res) => {
        try {
            await LikeDislikeService.unDisLike(req.query);

            res.json({ message: "Dislike in deleted", success: true });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static upDisLike: RequestHandler = async (req, res) => {
        try {
            const like = await LikeDislikeService.upDisLike(req.query);

            res.json({ message: "Add dislike", success: true, like });
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

}

export default LikeController;