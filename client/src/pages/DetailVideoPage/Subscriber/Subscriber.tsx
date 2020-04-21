import React from "react";
import cn from "classnames";

import "./style.scss";

type SubscriberPropsType = {
    subscribed: boolean,
    subscribers: number,
    onSubscribe: () => void
}

const Subscriber: React.FC<SubscriberPropsType> = ({ subscribed, subscribers, onSubscribe }): JSX.Element => (
    <div>
        <button
            className={cn("subscribe-btn", { "subscribe-btn--subscribe": subscribed })}
            onClick={ onSubscribe }
        >
            { subscribers } { subscribed ? 'Subscribed' : 'Subscribe' }
        </button>
    </div>
);

export default Subscriber;

