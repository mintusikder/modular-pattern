import { Router } from "express";
import { initDB } from "../../database/db";
import { userController } from "./user.controller";
const router = Router();
initDB();
router.post("/", userController.createUser);

export const userRoute = router;
