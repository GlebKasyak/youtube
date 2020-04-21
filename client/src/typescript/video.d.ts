import { CancelToken } from "axios";

import { IUser } from "./user";


export interface VideoState {
    videos: Array<IVideo>,
    searchVideos: Array<IVideo>,
    categoryType: string | null,
    videosByCategory: Array<IVideo>,
    video: IVideo | null,
    subscriptionVideos: Array<IVideo>,
    isSearching: boolean
}

export interface IVideo {
    _id?: string,
    views?: number,
    writer: IUser,
    title: string,
    description: string,
    privacy: string,
    category: string,
    filePath: string,
    duration?: number,
    thumbnail?: string,
    createdAt?: string,
    updatedAt?: string
}

export interface IVideoData extends Omit<IVideo, "writer"> {
    writer: string,
}

export interface GetVideosDataType  {
    token?: CancelToken,
    userId: string
    limit?: number,
    page?: number,
}

export type UploadVideoPropsType = {
    type: string,
    file: string,
    token: string
}

export type ValueType = {
    title: string,
    description: string
}

export type VideoFileType = {
    path: string,
    filename: string,
    thumbnail: {
        thumbsFilePath: string,
        fileDuration: string
    }
}

export type InfoType = {
    category: string,
    privacy: string
}
