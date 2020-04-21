import { Router } from "express";

import MailController from "../controllers/mailController";

const router: Router = Router();

router.post("/", MailController.sendMail);

export default router;

