// ============================================================
// Import Required Packages
// ============================================================
// Express Framework
import express from "express";

// Enable Cross-Origin Resource Sharing (CORS)
import cors from "cors";

// Load Environment Variables
import dotenv from "dotenv";

// HTTP Request Logger
import morgan from "morgan";

// ============================================================
// Import Route Files
// ============================================================

// Database Testing Routes
import testRoutes from "./routes/testRoutes.js";

// Authentication Routes
import authRoutes from "./routes/authRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";

import leaveRoutes from "./routes/leaveRoutes.js";

import managerRoutes from "./routes/managerRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

import employeeRoutes from "./routes/employeeRoutes.js";
// Load .env Variables
dotenv.config();

// ============================================================
// Create Express Application
// ============================================================

const app = express();

/* ===========================================================
   Middleware Configuration
=========================================================== */

// Enable CORS
// Allows frontend (React) to communicate with backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Parse JSON Request Body
app.use(express.json());

// Parse URL Encoded Form Data
app.use(
  express.urlencoded({
    extended: true,
  })
);



// Log Every HTTP Request
app.use(morgan("dev"));

/* ===========================================================
   Health Check API

   Route:
   GET /

   Purpose:
   Verify that backend server is running.
=========================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Leave Management API is running.",
  });
});

/* ===========================================================
   Application Routes
=========================================================== */

// Database Testing APIs
// Example:
// GET /api/test/database
app.use("/api/test", testRoutes);

// Authentication APIs
// POST /api/auth/register
// POST /api/auth/login
app.use("/api/auth", authRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/leave", leaveRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/employees", employeeRoutes);


// ============================================================
// Manager Routes
// ============================================================
app.use("/api/manager", managerRoutes);
/* ===========================================================
   404 Route Handler

   Executes only if no route matches.
=========================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

/* ===========================================================
   Global Error Handler

   Catches unexpected application errors.
=========================================================== */

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ===========================================================
   Export Express App
=========================================================== */

export default app;