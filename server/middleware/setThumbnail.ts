import { RequestHandler} from "express";
import path from "path";
import ffmpeg, { FfprobeData } from "fluent-ffmpeg";

import { setFolderPath } from "../utils/helpers";
import {} from "./../interfaces/common/index";

const setThumbnail: RequestHandler = async (req, res, next) => {
    try {
        let thumbsFilePath = "";
        let fileDuration: number;

        const filePath = req.files[req.name][0].path;

        await ffmpeg.ffprobe(filePath, (err: Error, metadata: FfprobeData) => {
            fileDuration = metadata.format.duration!;
        });

        await ffmpeg(filePath)
            .on("filenames", filenames => thumbsFilePath = setFolderPath(req.user.email, "thumbnails") + filenames[0])
            .on("end", () => {
                req.thumbnail = { thumbsFilePath, fileDuration };
                next();
            })
            .screenshots({
                count: 1,
                folder: path.resolve(__dirname, "../", setFolderPath(req.user.email, "thumbnails")),
                size: "320x240",
                filename: "thumbnail-%b.png"
            });
    } catch (err) {
        res.status(400).json({  message: err.message, success: false });
    }
};

export default setThumbnail;