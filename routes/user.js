import express from "express";
const router = express.Router();
import { getAllUsers, createUser, login, me } from "../controllers/user.js";

router.route("/").get(getAllUsers).post(createUser);

router.post("/signup", createUser);
router.route("/login1").post(login);

router.post("/me", me);

export default router;
