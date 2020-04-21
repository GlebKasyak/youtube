import { Router } from "express";
import LikeController from "../controllers/likeController";

const router: Router = Router();

router.get("/getLikes", LikeController.getLikes);
router.get("/getDislikes", LikeController.getDislikes);
router.get("/upLike", LikeController.upLike);
router.get("/unLike", LikeController.unLike);
router.get("/unDisLike", LikeController.unDisLike);
router.get("/upDisLike", LikeController.upDisLike);

export default router;