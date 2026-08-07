// Import bcrypt for password hashing
import bcrypt from "bcrypt";

// Import Supabase client for database operations
import supabase from "../config/supabase.js";

// Import JWT for token generation (used in login)
import jwt from "jsonwebtoken";

/* ===========================================================
   Employee Registration Controller
   ===========================================================
   Purpose:
   - Register a new employee
   - Check duplicate username
   - Hash password
   - Store user in Supabase
=========================================================== */

export const register = async (req, res) => {
  try {

    // Get username and password from request body
    const { username, password } = req.body;

    // -----------------------------
    // Validate Input
    // -----------------------------
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required."
      });
    }

    // --------------------------------------------------
    // Check whether the username already exists
    // --------------------------------------------------
    const { data: existingUser, error: existingError } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    // Database Error
    if (existingError) {
      return res.status(500).json({
        success: false,
        message: existingError.message
      });
    }

    // Username already exists
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists."
      });
    }

    // --------------------------------------------------
    // Hash Password
    // --------------------------------------------------
    // Salt Rounds = 10
    // Password is never stored as plain text.
    const hashedPassword = await bcrypt.hash(password, 10);

    // --------------------------------------------------
    // Insert Employee into Database
    // --------------------------------------------------
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          password: hashedPassword,
          role: "employee"
        }
      ])
      .select()
      .single();

    // Database Insert Error
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    // --------------------------------------------------
    // Registration Successful
    // --------------------------------------------------
    return res.status(201).json({
      success: true,
      message: "Employee registered successfully.",

      // Never return password hash
      user: {
        id: data.id,
        username: data.username,
        role: data.role
      }
    });

  } catch (error) {

    // Catch unexpected server errors
    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* ===========================================================
   Employee / Manager Login Controller
   ===========================================================
   Purpose:
   - Verify username
   - Compare password
   - Generate JWT Token
=========================================================== */

export const login = async (req, res) => {
  try {

    // Get username and password from request
    const { username, password } = req.body;

    // -----------------------------
    // Validate Input
    // -----------------------------
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required."
      });
    }

    // --------------------------------------------------
    // Find User in Database
    // --------------------------------------------------
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    // Database Error
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    // User Not Found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password."
      });
    }

    // --------------------------------------------------
    // Compare Entered Password with Stored Hash
    // --------------------------------------------------
    const passwordMatched = await bcrypt.compare(
      password,
      user.password
    );

    // Password Incorrect
    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password."
      });
    }

    // --------------------------------------------------
    // Generate JWT Token
    // --------------------------------------------------
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // --------------------------------------------------
    // Login Successful
    // --------------------------------------------------
    return res.status(200).json({
      success: true,
      message: "Login successful.",

      // JWT Token
      token,

      // Send User Information
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {

    // Catch unexpected server errors
    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};