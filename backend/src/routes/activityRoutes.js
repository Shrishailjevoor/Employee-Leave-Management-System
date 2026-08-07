import express from "express";
import { getActivities } from "../controllers/activityController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("manager"),
  getActivities
);

export default router;