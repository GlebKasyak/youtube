import instance from "./api";

import { LikeDislikeDataType } from "../typescript/likeDislike";


export class LikeDislikeAPI {
    static getLikes = (itemName: string, itemId: string) => {
        return instance.get(`/like/getLikes?${ itemName }=${ itemId }`)
    };

    static getDislikes = (itemName: string, itemId: string) => {
        return instance.get(`/like/getDislikes?${ itemName }=${ itemId }`)
    };

    static upLike = ({ itemName, itemId, userId }: LikeDislikeDataType) => {
        return instance.get(`/like/upLike?${ itemName }=${ itemId }&userId=${ userId }`)
    };

    static unLike = ({ itemName, itemId, userId }: LikeDislikeDataType) => {
        return instance.get(`/like/unLike?${ itemName }=${ itemId }&userId=${ userId }`)
    };

    static unDisLike = ({ itemName, itemId, userId }: LikeDislikeDataType) => {
        return instance.get(`/like/unDisLike?${ itemName }=${ itemId }&userId=${ userId }`)
    };

    static upDisLike = ({ itemName, itemId, userId }: LikeDislikeDataType) => {
        return instance.get(`/like/upDisLike?${ itemName }=${ itemId }&userId=${ userId }`)
    };
}