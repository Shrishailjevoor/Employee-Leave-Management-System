// ============================================================
// Import dotenv
// Loads environment variables from the .env file
// ============================================================
import dotenv from "dotenv";

// ============================================================
// Import Express Application
// app.js contains middleware, routes and error handlers
// ============================================================
import app from "./app.js";

// ============================================================
// Load Environment Variables
// ============================================================
dotenv.config();

// ============================================================
// Configure Server Port
// Uses the value from .env
// Falls back to port 5000 if not specified
// ============================================================
const PORT = process.env.PORT || 5000;

/* ===========================================================
   Start Express Server

   Purpose:
   - Starts the backend application
   - Listens for incoming HTTP requests
=========================================================== */

app.listen(PORT, () => {

  console.log("==========================================");
  console.log("🚀 Employee Leave Management Backend");
  console.log(`🌐 Server Running : http://localhost:${PORT}`);
  console.log(`📅 Environment    : ${process.env.NODE_ENV || "development"}`);
  console.log("==========================================");

});