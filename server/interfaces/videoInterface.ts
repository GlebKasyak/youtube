import { Document } from "mongoose";


export interface IVideo extends Document {
    writer: string,
    title: string,
    description: string,
    privacy: string,
    category: string,
    filePath: string,
    views: number,
    duration: string,
    thumbnail: string,

    getVideosById(): Promise<any>
}

export interface IVideoFile {
    path: string,
    filename: string,
    thumbnail: string
}
