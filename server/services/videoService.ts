import { Video, Subscribe } from "../models";
import { IVideo } from "../interfaces/videoInterface";
import { ISubscribeDocument } from "../interfaces/subscribeInterface";

type GetVideosProps = {
    limit: number,
    page: number,
    userFrom?: string
}

export default class VideoService  {
    constructor() {}

    static addVideo = async (data: IVideo): Promise<IVideo> => {
        try {
            return await Video.create(data)
        } catch (err) {
            throw new Error(err.message)
        }
    };

    static getVideos = async (data: GetVideosProps): Promise<IVideo[]> => {
        try {
            const videos: IVideo[] = await Video.find({ privacy: { $ne:  "Private" } })
                .populate("writer")
                .skip(Number(data.limit) * (Number(data.page) - 1))
                .limit(Number(data.limit));

            if(!videos) return [];

            return videos;
        } catch (err) {
            throw new Error(err.message)
        }
    };

    static getVideoDetail = async (videoId: string): Promise<IVideo> => {
        try {
            const video = await Video.findOne({ _id: videoId }).populate("writer");
            if(!video) throw new Error("Error with detail video");

            return video;
        } catch(err) {
            throw new Error(err.message)
        }
    };

    static getSubscriptionVideos = async (data: GetVideosProps): Promise<IVideo[]> => {
        //need to find all of users that I am subscribing to from Subscribing Collection
        let subscribedUsers: Array<string> = [];

        const subscribers: ISubscribeDocument[] = await Subscribe.find({ userFrom: data.userFrom }, "userTo -_id");
        if(!subscribers) throw new Error("You don't have any subscribers");

        subscribers.map((subscriber: ISubscribeDocument) =>
            subscribedUsers.push(subscriber.userTo)
        );

        //need to fetch all of the Videos that belong to the Users that I found in previous step
        //$in - search with array arguments
        return await  Video.find({ writer: { $in: subscribedUsers } })
            .populate("writer")
            .skip(Number(data.limit) * (Number(data.page) - 1))
            .limit(Number(data.limit));
    };

    static search = async (text: string): Promise<IVideo[]> => {
        try {
            const videos: IVideo[] = await Video.find({
                $or: [
                    { title: { $regex: text, $options: "i" } },
                    { description: { $regex: text, $options: "i" }}
                    ]}
            ).populate("writer");

            if(!videos) return [];

            return videos;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    static setViewVideo = async (videoId: string) => {
        try {
            await Video.findOneAndUpdate({ _id: videoId }, { $inc: { views: 1 } });
        } catch (err) {
            throw new Error(err.message);
        }
    };

    static getVideosByCategory = async (label: string): Promise<IVideo[]> => {
        try {
            let videos: IVideo[] = [];

            if(label === "Popular") {
                videos = await Video.find({}).populate("writer").sort({ views: -1 });
                if(!videos) return [];

                return videos
            }

            videos = await Video.find({ category: label }).populate("writer");
            if(!videos) return [];

            return videos;
        } catch (err) {
            throw new Error(err.message);
        }
    };
};
