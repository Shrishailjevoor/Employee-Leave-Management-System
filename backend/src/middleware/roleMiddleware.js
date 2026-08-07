// ============================================================
// Role Authorization Middleware
// ============================================================

// ============================================================
// Purpose:
// Restrict access to specific user roles
//
// Example:
// roleMiddleware("manager")
// roleMiddleware("employee")
// ============================================================

const roleMiddleware = (...allowedRoles) => {

  return (req, res, next) => {

    try {

      // --------------------------------------------------------
      // Ensure Authentication Middleware Has Executed
      // --------------------------------------------------------
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first."
        });
      }

      // --------------------------------------------------------
      // Check User Role
      // --------------------------------------------------------
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You do not have permission."
        });
      }

      // --------------------------------------------------------
      // User Authorized
      // Continue to Controller
      // --------------------------------------------------------
      next();

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };

};

export default roleMiddleware;