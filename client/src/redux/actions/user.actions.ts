import { ThunkAction } from "redux-thunk";

import * as userTypes from "../types/userTypes";
import { UserAPI } from "../../core/userAPI";
import { ScrollType } from "../../typescript/common";
import { AppStateType, InferActionsTypes } from "../reducers";

import { IUser, LoginDataType } from "../../typescript/user";

export const actions = {
    loginAC: (payload: IUser) => ({ type: userTypes.LOGIN_USER, payload } as const),
    setUserTokenAC: (payload: string) => ({ type: userTypes.SET_USER_TOKEN, payload } as const),
    logoutAC: () => ({ type: userTypes.LOGOUT_USER } as const),
    removeUserAC: () => ({ type: userTypes.REMOVE_USER } as const),
    updateImageAC: (payload: string) => ({ type: userTypes.UPDATE_IMAGE, payload } as const),
    getUsersAC: (payload: Array<IUser>) => ({ type: userTypes.GET_USERS, payload } as const),
    removeUserByIdAC: (payload: string) => ({ type: userTypes.REMOVE_USER_BY_ID, payload } as const),

    clearUsersListAC: () => ({ type: userTypes.CLEAR_USERS_LIST } as const)
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof actions>>;

export const getAuthUserData = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.me(token);
    const { success, user, token: userToken } = response.data;

    if(success) {
        dispatch(actions.setUserTokenAC(userToken!));
        dispatch(actions.loginAC(user!));
    }
};

export const login = (data: LoginDataType): ThunkActionType<any> => async dispatch => {
    try {
        const response = await UserAPI.login(data);

        const { success, token, message } = response.data;
        if(success) {
            dispatch(getAuthUserData(token!));

            return { success, message };
        }
    } catch (err) {
        return err.response.data.message;
    }
};

export const logout = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.logout(token);

    const { success } = response.data;
    if(success) dispatch(actions.logoutAC());
};

export const updateImage = (type: string, file: File, token: string): ThunkActionType<void> => async dispatch => {
   const response = await UserAPI.updateImage(type, file, token);

   const { success, image } = response.data;
   if(success) dispatch(actions.updateImageAC(image!));

};

export const removeUser = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.removeUser(token);

    if(response.data.success) dispatch(actions.removeUserAC());
};

export const getUsers = (data: ScrollType): ThunkActionType<any> => async dispatch => {
    const response = await UserAPI.getUsers(data);

    const { success, users } = response.data;
    if(success) dispatch(actions.getUsersAC(users!));

    return response.data.users;
};

export const removeUserById = (token: string, userId: string, email: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.removeUserById(token, userId, email);

    if(response.data.success) dispatch(actions.removeUserByIdAC(userId));
};

