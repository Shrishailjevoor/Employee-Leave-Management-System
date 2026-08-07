// ============================================================
// Import Express Framework
// Used to create authentication routes
// ============================================================
import express from "express";

// ============================================================
// Import Authentication Controllers
// register -> Employee Registration
// login    -> Employee & Manager Login
// ============================================================
import {
  register,
  login
} from "../controllers/authController.js";

// ============================================================
// Debug Message
// Displays in terminal when this route file is loaded
// (Remove before production deployment)
// ============================================================
console.log("✅ authRoutes loaded");

// ============================================================
// Create Express Router
// ============================================================
const router = express.Router();

// ============================================================
// Employee Registration API
// POST /api/auth/register
// Creates a new employee account
// ============================================================
router.post("/register", register);

// ============================================================
// User Login API
// POST /api/auth/login
// Verifies credentials and returns JWT Token
// ============================================================
router.post("/login", login);

// ============================================================
// Export Router
// Used in app.js
// app.use("/api/auth", authRoutes);
// ============================================================
export default router;