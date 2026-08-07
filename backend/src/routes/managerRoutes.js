// ============================================================
// Import Express
// ============================================================
import express from "express";

// ============================================================
// Import Manager Controller
// ============================================================
import {
  getAllLeaveRequests,
  updateLeaveStatus
} from "../controllers/managerController.js";
// ============================================================
// Import Authentication Middleware
// ============================================================
import authMiddleware from "../middleware/authMiddleware.js";

// ============================================================
// Import Role Middleware
// ============================================================
import roleMiddleware from "../middleware/roleMiddleware.js";

// ============================================================
// Create Router
// ============================================================
const router = express.Router();

/* ===========================================================
   GET ALL LEAVE REQUESTS

   Route:
   GET /api/manager/leaves

   Access:
   Manager Only
=========================================================== */

router.get(
  "/leaves",
  authMiddleware,
  roleMiddleware("manager"),
  getAllLeaveRequests
);

/* ===========================================================
   API: Approve / Reject Leave Request

   Route:
   PATCH /api/manager/leave/:id

   Access:
   Manager Only

   Description:
   Allows manager to approve or reject
   an employee leave request.
=========================================================== */

router.patch(

  "/leave/:id",

  // Verify JWT Token
  authMiddleware,

  // Allow only Manager
  roleMiddleware("manager"),

  // Execute Controller
  updateLeaveStatus

);

export default router;

