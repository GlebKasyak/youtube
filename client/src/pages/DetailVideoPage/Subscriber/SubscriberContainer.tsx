import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { getSubscribeInfo, subscribe, unSubscribe } from "../../../redux/actions/subscribe.action";
import Subscriber from "./Subscriber";

import { AppStateType } from "../../../redux/reducers";

import { SubscribeState, SubscribeDataType  } from "../../../typescript/subscribeInfo";

type MapStateToPropsType = {
    subscribeInfo: SubscribeState
}

type MapDispatchToPropsType = {
    getSubscribeInfo: (data: SubscribeDataType) => any,
    subscribe: (data: SubscribeDataType) => any,
    unSubscribe: (data: SubscribeDataType) => any
}

type OwnPropsType = {
    userTo: string,
    userFrom: string,
}

type SubscriberContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const SubscriberContainer: React.FC<SubscriberContainerPropsType> = (
    {
        userTo,
        userFrom,
        subscribeInfo,
        getSubscribeInfo,
        subscribe,
        unSubscribe
    }): JSX.Element => {
    const { subscribed, subscribers } = subscribeInfo;

    
    const fetchData = useCallback(async data => {
        await getSubscribeInfo(data)
    }, [getSubscribeInfo]);

    useEffect(() => {
        fetchData({ userTo, userFrom });
    }, [fetchData, userTo, userFrom]);


    const handleSubscribe = () => {
        if(subscribed) {
            unSubscribe({ userTo, userFrom });
        } else {
            subscribe({ userTo, userFrom });
        }
    };

    return  <Subscriber
        subscribed={ subscribed }
        subscribers={ subscribers }
        onSubscribe={ handleSubscribe }
    />
};


export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    ({ subscribeInfo }: AppStateType) => ({ subscribeInfo }),
    { getSubscribeInfo, subscribe, unSubscribe })
(SubscriberContainer);


