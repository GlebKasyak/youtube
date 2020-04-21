import { ThunkAction } from "redux-thunk";

import * as subscribeTypes from "../types/subscribeTypes";
import { SubscribeAPI } from "../../core/subscribeAPI";
import { SubscribeState, SubscribeDataType } from "../../typescript/subscribeInfo";
import { AppStateType, InferActionsTypes } from "../reducers";


export const actions = {
    getSubscribeInfoAC: (payload: SubscribeState) =>
        ({ type: subscribeTypes.GET_SUBSCRIBE_INFO, payload } as const),
    subscribeAC: () => ({ type: subscribeTypes.SUBSCRIBE } as const),
    unSubscribeAC: () => ({ type: subscribeTypes.UN_SUBSCRIBE } as const)
};



type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, InferActionsTypes<typeof actions>>;

export const getSubscribeInfo = (data: SubscribeDataType): ThunkActionType => async dispatch => {
    const response = await SubscribeAPI.getSubscribeInfo(data);

    const { success, subscriptionInformation } = response.data;
    if(success) {
        dispatch(actions.getSubscribeInfoAC(subscriptionInformation!))
    }
};

export const subscribe = (data: SubscribeDataType): ThunkActionType => async dispatch => {
    const response = await SubscribeAPI.subscribe(data);

    if(response.data.success) dispatch(actions.subscribeAC());
};

export const unSubscribe = (data: SubscribeDataType): ThunkActionType => async dispatch => {
    const response = await SubscribeAPI.unSubscribe(data);

    if(response.data.success) dispatch(actions.unSubscribeAC());
};
