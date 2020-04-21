import { Router } from "express";

import { auth, admin, uploadFile, recapcha } from "../middleware";
import UserController from "../controllers/userController";

const router: Router = Router();

router.get("/", auth, UserController.auth);
router.post("/", UserController.register);
router.get("/logout", auth, UserController.logout);
router.post("/login", recapcha, UserController.login);
router.post("/update-image", auth, uploadFile, UserController.uploadImage);
router.delete("/", auth, UserController.removeUser);

router.get("/all", admin, UserController.getUsers);
router.delete("/all", admin, UserController.removeUserById);

export default router;

