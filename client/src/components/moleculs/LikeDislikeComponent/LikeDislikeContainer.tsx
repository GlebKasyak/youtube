import React from "react";

import { useLikeAndDislike } from "../../../hooks/useLikeAndDislike";

import LikeDislike from "./LikeDislike";


type LikeDislikeContainerPropsType = {
    itemName: string,
    itemId: string,
    userId: string
};

const LikeDislikeContainer: React.FC<LikeDislikeContainerPropsType> = (
    {
        itemName,
        itemId,
        userId
    }) => {
    const [incrItem, decrItem, state] = useLikeAndDislike(itemName, itemId, userId);

    const onLike = () => {
        if (!state.likeAction) {
            incrItem("upLike", "likes", "likeAction", "liked", "dislikeAction", "dislikes");
        } else {
            decrItem("unLike", "likes", "likeAction");
        }
    };

    const onDislike = () => {
        if (!state.dislikeAction) {
            incrItem("upDisLike", "dislikes", "dislikeAction", "disliked", "likeAction", "likes");
        } else {
            decrItem("unDisLike", "dislikes", "dislikeAction");
        }
    };

    return <LikeDislike
        onLike={ onLike }
        onDislike={ onDislike }
        likeAction={ state.likeAction}
        dislikeAction={ state.dislikeAction }
        likes={ state.likes }
        dislikes={ state.dislikes }
    />

};

export default LikeDislikeContainer;
