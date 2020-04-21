import { Reducer } from "redux";

import * as userTypes from "../types/userTypes";
import { actions } from "../actions/user.actions";
import { UserState, IUser } from "../../typescript/user";
import { InferActionsTypes } from "./index";

const initialState: UserState = {
    user: {
     firstName: "",
     secondName: "",
     email: "",
     _id: "",
     role: "",
     image: "",
     createdAt: "",
     isAuth: false
    },
    token: "",
    users: [],
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const reducer: Reducer<UserState, ActionsTypes> = (state = initialState, action: ActionsTypes ): UserState => {
    switch (action.type) {
        case userTypes.LOGIN_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                    isAuth: true
                }
            };
        case userTypes.SET_USER_TOKEN:
            return { ...state, token: action.payload };
        case userTypes.LOGOUT_USER:
            return {
                ...state,
                user: {
                    ...initialState.user,
                    isAuth: false
                }
            };
        case userTypes.UPDATE_IMAGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    image: action.payload
                }
            };
        case userTypes.REMOVE_USER:
            return { ...state, user: initialState.user };
        case userTypes.GET_USERS:
            return {
                ...state,
                users: [
                    ...state.users,
                    ...action.payload
                ]
            };
        case userTypes.REMOVE_USER_BY_ID:
            return {
                ...state,
                users: state.users.filter((user: IUser) => user._id !== action.payload)
            };
        case userTypes.CLEAR_USERS_LIST:
            return { ...state, users: [] };
        default:
            return state;
    }
};

export default reducer;