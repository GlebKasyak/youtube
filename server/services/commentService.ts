import { ICommentDocument } from "../interfaces/commentInterface";
import { Comment } from "./../models";

export default class CommentService {
    constructor() {}

    static postComment = async (data: ICommentDocument): Promise<ICommentDocument | null> => {
        try {
            const newComment = await Comment.create(data);

            return await Comment.findById(newComment._id).populate("writer");
        } catch(err) {
            throw new Error(err.message);
        }
    };

    static getCommentsByPostId = async (postId: string): Promise<ICommentDocument[]> => {
        try {
            return await Comment.find({postId}).populate("writer");
        } catch (err) {
            throw new Error(err.message);
        }
    }
}



