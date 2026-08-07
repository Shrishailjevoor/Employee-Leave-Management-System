// ============================================================
// Import Express Framework
// ============================================================
import express from "express";

// ============================================================
// Import Leave Controller
// ============================================================
import {
  applyLeave,
  getMyLeaves
} from "../controllers/leaveController.js";
// ============================================================
// Import Authentication Middleware
// Ensures only logged-in users can access the route


// ============================================================
import authMiddleware from "../middleware/authMiddleware.js";

// ============================================================
// Import Multer Configuration
// ============================================================
import upload from "../config/multer.js";
// ============================================================
// Create Express Router
// ============================================================
const router = express.Router();

/* ===========================================================
   Apply Leave API

   Route:
   POST /api/leave/apply

   Access:
   Employee (Authenticated User)

   Description:
   Allows a logged-in employee to submit a leave request.
=========================================================== */

router.post(
  "/apply",

  // Verify JWT
  authMiddleware,

  // Accept one uploaded document
  upload.single("document"),

  // Controller
  applyLeave
);
/* ===========================================================
   Get My Leave History API

   Route:
   GET /api/leave/my-leaves

   Access:
   Authenticated Employee

   Description:
   Returns all leave requests submitted by
   the logged-in employee.
=========================================================== */

router.get(

  "/my-leaves",

  // Verify JWT Token
  authMiddleware,

  // Controller
  getMyLeaves

);
// ============================================================
// Export Router
// ============================================================
export default router;