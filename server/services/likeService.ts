import { Like, Dislike } from "./../models";
import { ILikeDislikeDocument } from "../interfaces/likeDislikeInterface";

export default class LikeDislikeService {
    constructor() {}

    static getLikes = async (data: ILikeDislikeDocument): Promise<ILikeDislikeDocument[]> => {
        const likes: ILikeDislikeDocument[] = await Like.find(data);
        if(!likes) throw new Error("Error. Not found likes");

        return likes;
    };

    static getDislikes = async (data: ILikeDislikeDocument) => {
        const dislikes: ILikeDislikeDocument[] = await Dislike.find(data);
        if(!dislikes) throw new Error("Error. Not found likes");

        return dislikes;
    };

    static upLike = async (data: ILikeDislikeDocument): Promise<ILikeDislikeDocument> => {
        const like: ILikeDislikeDocument = await Like.create(data);
        if(!like) throw new Error("Error! Like in not added");

        await Dislike.findOneAndDelete(data);
        return like;
    };

    static unLike = async (data: ILikeDislikeDocument) => {
        const result = await Like.findOneAndDelete(data);
        if(!result) throw new Error("Error! Like is not deleted");
    };

    static unDisLike = async (data: ILikeDislikeDocument) => {
        const result = await Dislike.findOneAndDelete(data);
        if(!result) throw new Error("Error! Dislike is not deleted");
    };

    static upDisLike = async (data: ILikeDislikeDocument): Promise<ILikeDislikeDocument> => {
        const dislike: ILikeDislikeDocument = await Dislike.create(data);
        if(!dislike) throw new Error("Error! Dislike in not created");

        await Like.findOneAndDelete(data);
        return dislike;
    };
}

