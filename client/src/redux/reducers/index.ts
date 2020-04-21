import { combineReducers } from "redux";

import user from "./user.reducer";
import video from "./video.reducer";
import subscribeInfo from "./subscribeInfo.reducer";
import comment from "./comment.reducer";

const rootReducer = combineReducers({
    user,
    video,
    subscribeInfo,
    comment
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any } > = ReturnType<PropertiesTypes<T>>

export default rootReducer;