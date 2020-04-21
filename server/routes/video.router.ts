import { Router } from "express";
import { uploadFile, setThumbnail, auth } from "../middleware";
import VideoController from "../controllers/videoController";

const router: Router = Router();

router.post("/", auth, uploadFile, setThumbnail, VideoController.upload);
router.post("/add", auth, VideoController.addVideo);
router.get("/", VideoController.getVideos);
router.get("/detail/:videoId", VideoController.getVideoDetail);
router.get("/subscription-videos", VideoController.getSubscriptionVideos);
router.post("/search", VideoController.search);
router.post("/view", VideoController.setViewVideo);
router.post("/search-by-category", VideoController.getVideosByCategory);


export default router;
