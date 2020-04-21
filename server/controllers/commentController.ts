import { RequestHandler } from "express";

import CommentService from "../services/commentService";

class SubscribeController {
    constructor() {}

    static postComment: RequestHandler = async (req, res) =>{
        try {
            const comment = await CommentService.postComment(req.body);

            res.status(201).json({ message: "Comment is created", success: true, comment });
        } catch(err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static getCommentsByPostId: RequestHandler = async (req, res) => {
        try {
            const commentsList = await CommentService.getCommentsByPostId(req.params.postId);

            res.json({ message: "Comment list by postId", success: true, commentsList });
        } catch(err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };
}

export default SubscribeController