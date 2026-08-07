import express from "express";

import {
  getNotifications,
  getUnreadNotifications,
  markNotificationsRead,
} from "../controllers/notificationController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Notification History
router.get("/", protect, getNotifications);

// Unread Notifications (for Toast)
router.get("/unread", protect, getUnreadNotifications);

// Mark Notifications as Read
router.patch("/read", protect, markNotificationsRead);

export default router;