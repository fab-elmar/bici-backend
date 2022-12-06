import express from "express";
import { createPinRating, getPinRating } from "../controllers/rating.js";

const router = express.Router();

router.route("/").post(createPinRating);

router.route("/get").post(getPinRating);

export default router;
