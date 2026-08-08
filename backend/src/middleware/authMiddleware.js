// ============================================================
// Import JWT Library
// Used to verify authentication tokens.
// ============================================================
import jwt from "jsonwebtoken";


// ============================================================
// Authentication Middleware
//
// Purpose:
// - Verify JWT token
// - Allow authenticated users
// - Block unauthorized users
//
// Used For:
// - Employee Dashboard
// - Manager Dashboard
// - Leave APIs
// - Other protected API routes
// ============================================================

const authMiddleware = (req, res, next) => {

  try {

    // ========================================================
    // Get Authorization Header
    //
    // Expected format:
    // Authorization: Bearer <JWT_TOKEN>
    // ========================================================
    const authHeader = req.headers.authorization;


    // ========================================================
    // Check Whether Authorization Header Exists
    // ========================================================
    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });

    }


    // ========================================================
    // Extract JWT Token
    //
    // The header is split into:
    // ["Bearer", "<JWT_TOKEN>"]
    // ========================================================
    const token = authHeader.split(" ")[1];


    // ========================================================
    // Validate Extracted Token
    // ========================================================
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });

    }


    // ========================================================
    // Verify JWT Token
    //
    // The JWT_SECRET is loaded from the backend environment
    // variables and is never exposed to the client.
    // ========================================================
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // ========================================================
    // Store Authenticated User
    //
    // The decoded JWT payload contains information such as:
    // - User ID
    // - Username
    // - Role
    //
    // Controllers can access this information through:
    // req.user
    // ========================================================
    req.user = decoded;


    // ========================================================
    // Continue Request
    //
    // Authentication was successful, so the request proceeds
    // to the next middleware or controller.
    // ========================================================
    next();

  } catch (error) {

    // ========================================================
    // Handle Invalid or Expired JWT
    // ========================================================
    console.error("Authentication Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });

  }

};


// ============================================================
// Export Authentication Middleware
// ============================================================
export default authMiddleware;