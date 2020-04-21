import { ThunkAction } from "redux-thunk";

import * as videoTypes from "../types/videoTypes"
import { VideoAPI } from "../../core/vedeoAPI";
import { AppStateType, InferActionsTypes } from "../reducers";
import { IVideo, GetVideosDataType } from "../../typescript/video";


export const actions = {
    getVideosAC: (payload: Array<IVideo>) => ({ type: videoTypes.GET_VIDEOS, payload } as const),
    getVideoDetailAC: (payload: IVideo) => ({ type: videoTypes.GET_VIDEO_DETAIL, payload } as const),
    getSubscriptionVideosAC: (payload: Array<IVideo>) => ({ type: videoTypes.GET_SUBSCRIPTION_VIDEOS, payload } as const),
    searchVideosAC: (payload: Array<IVideo>) => ({ type: videoTypes.SEARCH_VIDEO, payload } as const),
    setViewVideoAC: () => ({ type: videoTypes.SET_VIEW_VIDEO } as const),
    getVideosByCategoryAC: (payload: Array<IVideo>) => ({ type: videoTypes.GET_VIDEOS_BY_CATEGORY, payload } as const),

    isSearchingAC: (payload: boolean) => ({ type: videoTypes.IS_SEARCHING, payload } as const),
    clearVideosAC: () => ({ type: videoTypes.CLEAR_VIDEOS } as const),
    setCategoryTypeAC: (payload: string) => ({ type: videoTypes.SET_CATEGORY_TYPE, payload } as const)
};



type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof actions>>;

export const getVideos = (data: GetVideosDataType): ThunkActionType<Array<IVideo>> => async dispatch => {
    const response = await VideoAPI.getVideos(data);

    const { videos, success } = response.data;
    if(success) dispatch(actions.getVideosAC(videos));

    return response.data.videos;
};

export const getVideoDetail = (id: string): ThunkActionType<void> => async dispatch => {
    const response = await VideoAPI.getVideoDetail(id);

    const { success, video } = response.data;
    if(success) dispatch(actions.getVideoDetailAC(video));
};


export const getSubscriptionVideos = (data: GetVideosDataType): ThunkActionType<Array<IVideo>> => async dispatch => {
    const response = await VideoAPI.getSubscriptionVideos(data);

    const { success, videos } = response.data;
    if(success) {
       dispatch(actions.getSubscriptionVideosAC(videos));
    }

    return response.data.videos;
};

export const searchVideos = (text: string): ThunkActionType<void> => async dispatch => {
    const response = await VideoAPI.searchVideos(text);

    const { success, videos } = response.data;
    if(success) dispatch(actions.searchVideosAC(videos));

};

export const setViewVideo = (data: { videoId: string }): ThunkActionType<void> => async dispatch => {
    const response = await VideoAPI.setViewVideo(data);

    if(response.data.success) dispatch(actions.setViewVideoAC());

};

export const getVideosByCategory = (label: string):ThunkActionType<void> => async dispatch => {
    const response = await VideoAPI.getVideosByCategory({label});

    const { success, videos } = response.data;
    if(success) dispatch(actions.getVideosByCategoryAC(videos));
};