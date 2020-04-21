import { Router } from "express";
import CommentController from "../controllers/commentController";

const router: Router = Router();

router.post("/", CommentController.postComment);
router.get("/:postId", CommentController.getCommentsByPostId);

export default router;