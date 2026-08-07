// ============================================================
// Import Supabase Client Library
// Used to connect the backend with Supabase Database & Storage
// ============================================================
import { createClient } from "@supabase/supabase-js";

// Import dotenv to load environment variables
import dotenv from "dotenv";

// Load variables from .env file
dotenv.config();

// ============================================================
// Read Supabase Credentials from Environment Variables
// ============================================================

// Supabase Project URL
const supabaseUrl = process.env.SUPABASE_URL;

// Supabase Service Role Key
// Used only in backend because it has full database access
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ============================================================
// Validate Environment Variables
// Prevent server from starting if credentials are missing
// ============================================================
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env"
  );
}

// ============================================================
// Create Supabase Client
// This client will be used throughout the project
// ============================================================
const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {

      // Disable automatic token refresh
      // JWT authentication will be handled manually
      autoRefreshToken: false,

      // Prevent storing Supabase session
      // Backend uses JWT instead of Supabase Auth Sessions
      persistSession: false
    }
  }
);

// ============================================================
// Export Supabase Client
// Any controller or service can import this file
// Example:
// import supabase from "../config/supabase.js";
// ============================================================
export default supabase;