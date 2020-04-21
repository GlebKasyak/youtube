import { Request } from "express";
import path from "path";
import multer  from "multer";

import { setFolderPath } from "../utils/helpers";
import {
    File,
    FileFilterHandler,
    FileNameCallback,
    FileDestinationCallback
} from "../interfaces/common/MulterInterface";
import {} from "./../interfaces/common/index";

const storage = multer.diskStorage({
    destination: (req: Request, file: File, cb: FileDestinationCallback) => {
        switch (file.fieldname) {
            case "video-file" :
                cb(null, path.resolve(__dirname, "../", setFolderPath(req.user.email, "video")));
                break;
            case "image" :
                cb(null, path.resolve(__dirname, "../", setFolderPath(req.user.email, "images")));
                break;
        }
    },
    filename: (req: Request, file: File, cb: FileNameCallback) => {
        cb(null, `${ Date.now() }_${ file.originalname }`)
    }
});

const fileFilter: FileFilterHandler = (req, file, cb) => {
    const ext: string = path.extname(file.originalname);
    req.name = file.fieldname;

    if(file.fieldname === "video-file" && ext.match(/\.(mp4)$/) ||
        (file.fieldname === "image" && ext.match(/\.(jpg|jpeg|JPEG|png)$/))) {
        return cb(null, true);
    }

    return cb(new Error("Error! Invalid file type!"));
};

export default multer({ storage, fileFilter }).fields([
    { name: "video-file", maxCount: 1 },
    { name: "image", maxCount: 1 }
]);