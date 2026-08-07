// ============================================================
// Import Supabase Client
// ============================================================
import supabase from "../config/supabase.js";

/* ===========================================================
   Get Employee Notifications

   Purpose:
   Returns all unread notifications of the logged-in employee.
=========================================================== */

export const getNotifications = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("employee_id", employeeId)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      notifications: data,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getUnreadNotifications = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("employee_id", employeeId)
      .eq("is_read", false)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      notifications: data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


/* ===========================================================
   Mark Notifications as Read

   Purpose:
   Updates all unread notifications for the logged-in employee
   to is_read = true.

   Route:
   PATCH /api/notifications/read
=========================================================== */

export const markNotificationsRead = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("employee_id", employeeId)
      .eq("is_read", false);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications marked as read.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};