// ============================================================
// Import JWT Library
// Used to verify authentication tokens
// ============================================================
import jwt from "jsonwebtoken";

/* ===========================================================
   Authentication Middleware

   Purpose:
   - Verify JWT Token
   - Allow authenticated users
   - Block unauthorized users

   Used For:
   Employee Dashboard
   Manager Dashboard
   Leave APIs
=========================================================== */

const authMiddleware = (req, res, next) => {

  try {

    // --------------------------------------------------------
    // Get Authorization Header
    // Example:
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
    // --------------------------------------------------------
    const authHeader = req.headers.authorization;

    // Token Missing
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required."
      });
    }

    // --------------------------------------------------------
    // Extract JWT Token
    // --------------------------------------------------------
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format."
      });
    }

    // --------------------------------------------------------
    // Verify JWT Token
    // --------------------------------------------------------
    console.log("Authorization Header:", authHeader);
console.log("Extracted Token:", token);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

console.log("Decoded User:", decoded);

    // Store Logged-in User Information
    req.user = decoded;

    // Continue to Next Middleware / Controller
    next();

} catch (error) {

  console.log("JWT ERROR:", error);

  return res.status(401).json({
    success: false,
    message: "Invalid or expired token."
  });

}

};

export default authMiddleware;