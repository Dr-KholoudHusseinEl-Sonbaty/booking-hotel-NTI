import { Router } from "express";
import auth from "../../middleware/auth.js";
import * as userController from "./controller/user.js";
const router = Router();

router.get("/", userController.getUserModule);
router.get("/profile", auth, userController.profile);
router.put("/", auth, userController.updateUser);
router.delete("/", auth, userController.deleteUser);

export default router;
