import { RequestHandler } from "express";
import VideoService from "../services/videoService";
import { IVideo, IVideoFile } from "../interfaces/videoInterface";

class VideoController {
    constructor() {}

    static upload: RequestHandler = async (req, res) => {
        try {
            const { path, filename } = req.files[req.name][0];
            const videoFile: IVideoFile = {
                path: path.substring(path.indexOf("uploads")),
                filename,
                thumbnail: req.thumbnail
            };

            res.status(201).json({  message: "File is saved!", success: true, videoFile });
        } catch(err) {
            res.status(400).json({ message: `Error. Video is not created. ${ err.message }`, success: false });
        }
    };

    static addVideo: RequestHandler = async (req, res) => {
        try {
            const videoFile: IVideo = await VideoService.addVideo(req.body);

            res.status(201).json({ message: "Video file added", success: true, videoFile })
        } catch (err) {
            res.status(400).json({ message: `Error. Video is not saved. ${ err.message }`, success: false });
        }
    };

    static getVideos: RequestHandler = async (req, res) => {
        try {
            const videos = await VideoService.getVideos(req.query);

            res.json({ message: "Videos", success: true, videos })
        } catch (err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static getVideoDetail: RequestHandler = async (req, res) => {
        try {
            const video = await VideoService.getVideoDetail(req.params.videoId);
            res.json({ message: "Video detail", success: true, video });
        } catch(err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static getSubscriptionVideos: RequestHandler = async (req, res) => {
        try {
           const videos = await VideoService.getSubscriptionVideos(req.query);

           res.json({ message: "subscription videos", success: true, videos });
        } catch(err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static search: RequestHandler = async (req, res) => {
        try {
            const videos = await VideoService.search(req.body.text);

            res.json({ message: "Videos founded", success: true, videos });
        } catch(err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static setViewVideo: RequestHandler = async (req, res) => {
        try {
            await VideoService.setViewVideo(req.body.videoId);

            res.json({ message: "Video is watched", success: true });
        } catch(err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };

    static getVideosByCategory: RequestHandler = async (req, res) => {
        try {
            const videos = await VideoService.getVideosByCategory(req.body.label);

            res.json({ message: "Videos founded", success: true, videos });
        } catch(err) {
            res.status(400).json({ message: err.message, success: false });
        }
    };
}

export default VideoController;