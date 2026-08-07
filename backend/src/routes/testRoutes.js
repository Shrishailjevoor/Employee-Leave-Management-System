// ============================================================
// Import Express Framework
// Used to create testing routes
// ============================================================
import express from "express";

// ============================================================
// Import Supabase Client
// Used to test database connectivity
// ============================================================
import supabase from "../config/supabase.js";

// ============================================================
// Create Express Router
// ============================================================
const router = express.Router();

/* ===========================================================
   Database Connection Test API
   ===========================================================
   Route:
   GET /api/test/database

   Purpose:
   - Verify backend is connected to Supabase
   - Verify "users" table is accessible
   - Used only during development/testing
=========================================================== */

router.get("/database", async (req, res) => {

  try {

    // --------------------------------------------------------
    // Read one record from the users table
    // If the table exists and connection is successful,
    // Supabase will return data.
    // --------------------------------------------------------
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    // --------------------------------------------------------
    // Handle Database Errors
    // --------------------------------------------------------
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Supabase connection failed.",
        error: error.message
      });
    }

    // --------------------------------------------------------
    // Database Connected Successfully
    // --------------------------------------------------------
    return res.status(200).json({
      success: true,
      message: "Supabase connected successfully.",
      data
    });

  } catch (err) {

    // --------------------------------------------------------
    // Handle Unexpected Server Errors
    // --------------------------------------------------------
    return res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

// ============================================================
// Export Router
// Used inside app.js
//
// app.use("/api/test", testRoutes);
// ============================================================
export default router;