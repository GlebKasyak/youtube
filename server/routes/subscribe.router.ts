import { Router } from "express";
import SubscribeController from "../controllers/subscribeController";

const router: Router = Router();

router.post("/", SubscribeController.getSubscribeInfo);
router.post("/subscribe", SubscribeController.subscribe);
router.post("/us-subscribe", SubscribeController.unSubscribe);

export default router;