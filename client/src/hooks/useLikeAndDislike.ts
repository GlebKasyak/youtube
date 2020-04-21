import React, { useCallback, useEffect, useReducer } from "react";
import { LikeDislikeAPI } from "../core/likeDislikeAPI";

type StateType = {
    likes: number
    dislikes: number,
    likeAction: "liked" | null,
    dislikeAction: "disliked" | null
};

type UpLikeActionType = {
    type: "likeAction",
    payload: "liked" | null
}

type UpDislikeActionType = {
    type: "dislikeAction",
    payload: "disliked" | null
}

type LikesActionType = {
    type: "likes",
    payload: number
}

type DislikesActionType = {
    type: "dislikes",
    payload: number
}

type ActionsType =
    | UpLikeActionType
    | UpDislikeActionType
    | LikesActionType
    | DislikesActionType


const initialState: StateType = {
    likes: 0,
    dislikes: 0,
    likeAction: null,
    dislikeAction: null
};

const reducer: React.Reducer<StateType, ActionsType> = (state, action): StateType => {
    switch (action.type) {
        case "likes":
            return {
                ...state,
                likes: action.payload
            };
        case "dislikes":
            return {
                ...state,
                dislikes: action.payload
            };
        case "likeAction":
            return {
                ...state,
                likeAction: action.payload
            };
        case "dislikeAction":
            return {
                ...state,
                dislikeAction: action.payload
            };
        default:
            return state;
    }
};

export const useLikeAndDislike = (itemName: string, itemId: string, userId: string) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback(async (
        getItemsCbName: "getLikes" | "getDislikes",
        type: "likes" | "dislikes" ,
        actionType: "likeAction" | "dislikeAction",
        action: "liked" | "disliked" | any,
        itemName: string,
        itemId: string,
        userId: string
    ) => {
        try {
            const response = await LikeDislikeAPI[getItemsCbName](itemName, itemId);

            if(response.data.success) {
                // let a = response.data;
                // type aa = typeof a;
                dispatch({ type, payload: response.data[type].length });

                type ItemType = {
                    userId: string,
                    commentId: string,
                    videoId: string
                };

                response.data[type].map((item: ItemType) => {
                    if(item.userId === userId) {
                        dispatch({ type: actionType, payload: action })
                    }
                    return item;
                });
            }
        } catch(err) { throw new Error(err) }
    }, []);

    useEffect(() => {
        fetchData("getLikes", "likes", "likeAction", "liked", itemName, itemId, userId);
        fetchData("getDislikes", "dislikes", "dislikeAction", "disliked", itemName, itemId, userId);
    }, [fetchData, itemName, itemId, userId]);

    type IncrItemType = (
        itemCbName: "upLike"| "upDisLike",
        type: "likes" | "dislikes",
        actionType: "likeAction" | "dislikeAction",
        action: "liked" | "disliked" | any,
        oppositeActionType: "dislikeAction" | "likeAction",
        oppositeType: "dislikes" | "likes"
    ) => Promise<void>;

    const incrItem: IncrItemType = async (
        itemCbName,
        type,
        actionType,
        action,
        oppositeActionType,
        oppositeType
    ) => {
        try {
            const response = await LikeDislikeAPI[itemCbName]({ itemName, itemId, userId });

            if(response.data.success) {
                dispatch({ type, payload: state[type] + 1 });
                dispatch({ type: actionType, payload: action });

                if (state[oppositeActionType] !== null) {
                    dispatch({ type: oppositeActionType, payload: null });
                    dispatch({ type: oppositeType, payload: state[oppositeType] - 1 });
                }
            }
        } catch (err) { throw new Error(err) }
    };

    type DecrItemType = (
        itemCbName: "unLike" | "unDisLike",
        type: "likes" | "dislikes",
        actionType: "dislikeAction" | "likeAction"
    ) => Promise<void>;

    const decrItem: DecrItemType = async (itemCbName, type, actionType) => {
        try {
            const response = await LikeDislikeAPI[itemCbName]({ itemName, itemId, userId });

            if(response.data.success) {
                dispatch({ type, payload: state[type] - 1 });
                dispatch({ type: actionType, payload: null });
            }
        } catch (err) { throw new Error(err) }
    };

    return [incrItem, decrItem, state] as [IncrItemType, DecrItemType, StateType];
};