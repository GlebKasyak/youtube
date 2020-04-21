import { Reducer } from "redux";

import { InferActionsTypes } from "./index";
import * as subscribeTypes from "../types/subscribeTypes";
import { SubscribeState } from "../../typescript/subscribeInfo";
import { actions } from "../actions/subscribe.action";

const initialState: SubscribeState = {
    subscribers: 0,
    subscribed: false
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const reducer: Reducer<SubscribeState, ActionsTypes> = (state = initialState, action: ActionsTypes): SubscribeState => {
    switch (action.type) {
        case subscribeTypes.GET_SUBSCRIBE_INFO:
            return {
                ...state,
                ...action.payload
            };
        case subscribeTypes.SUBSCRIBE:
            return {
                subscribers: state.subscribers + 1,
                subscribed: true
            };
        case subscribeTypes.UN_SUBSCRIBE:
            return {
                subscribers: state.subscribers - 1,
                subscribed: false
            };
        default:
            return state;
    }
};

export default reducer;