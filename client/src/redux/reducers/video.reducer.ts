import { Reducer } from "redux";

import * as videoTypes from "../types/videoTypes"
import { VideoState } from "../../typescript/video";
import { InferActionsTypes } from "./index";
import { actions } from "../actions/video.actions";

const initialState: VideoState = {
    videos: [],
    searchVideos: [],
    categoryType: null,
    videosByCategory: [],
    video: null,
    subscriptionVideos: [],
    isSearching: false
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const reducer: Reducer<VideoState, ActionsTypes> = (state = initialState, action: ActionsTypes): VideoState => {
    switch (action.type) {
        case videoTypes.GET_VIDEOS:
            return {
                ...state,
                videos: [
                    ...state.videos,
                    ...action.payload
                ]
            };
        case videoTypes.CLEAR_VIDEOS:
            return { ...state, videos: [] };
        case videoTypes.GET_VIDEO_DETAIL:
            return {
                ...state,
                video: action.payload
            };
        case videoTypes.GET_SUBSCRIPTION_VIDEOS:
            return {
                ...state,
                subscriptionVideos: [
                    ...state.subscriptionVideos,
                    ...action.payload
                ]
            };
        case videoTypes.SET_VIEW_VIDEO:
            return {
                ...state,
                video: {
                    ...state.video!,
                    views: state.video!.views! + 1
                }
            };
        case videoTypes.SEARCH_VIDEO:
            return {
                ...state,
                searchVideos: action.payload,
                isSearching: false
            };
        case videoTypes.GET_VIDEOS_BY_CATEGORY:
            return {
                ...state,
                videosByCategory: action.payload,
                isSearching: false
            };
        case videoTypes.SET_CATEGORY_TYPE:
            return { ...state,  categoryType: action.payload };
        case videoTypes.IS_SEARCHING:
            return { ...state, isSearching: action.payload };
        default:
            return state;
    }
};

export default reducer;