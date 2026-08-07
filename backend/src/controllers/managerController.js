// ============================================================
// Import Notification Service
// ============================================================
import { createNotification } from "../services/notificationService.js";

// ============================================================
// Import Supabase Client
// ============================================================
import supabase from "../config/supabase.js";

/* ===========================================================
   Get All Leave Requests

   Purpose:
   Manager can view all employee leave requests.
=========================================================== */

export const getAllLeaveRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leave_requests")
      .select(`
        id,
        employee_id,
        reason,
        start_date,
        end_date,
        document_url,
        status,
        manager_remarks,
        created_at,
        users!leave_requests_employee_id_fkey (
          username
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      totalRequests: data.length,
      requests: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================================
   Update Leave Status

   Purpose:
   - Manager can approve or reject leave
   - Save manager remarks
   - Automatically trigger employee notification

   Route:
   PATCH /api/manager/leave/:id
=========================================================== */

export const updateLeaveStatus = async (req, res) => {
  try {
    // Leave Request ID
    const { id } = req.params;

    // Request Body
    const { status, manager_remarks } = req.body;

    // Validate Status
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected.",
      });
    }

    // Update Leave Request and return the updated row
    const { data, error } = await supabase
      .from("leave_requests")
      .update({
        status,
        manager_remarks,
      })
      .eq("id", id)
      .select()
      .single();

    // Database Error
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // Record Not Found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found.",
      });
    }

    // --------------------------------------------------------
    // Create Notification for Employee
    // --------------------------------------------------------
    const remarksText = manager_remarks ? ` Remarks: ${manager_remarks}` : "";
    const notificationMessage =
      status === "Approved"
        ? `✅ Your leave request has been approved.${remarksText}`
        : `❌ Your leave request has been rejected.${remarksText}`;

    // Insert notification using your existing service
    await createNotification(data.employee_id, notificationMessage);

    // --------------------------------------------------------
    // Success Response
    // --------------------------------------------------------
    return res.status(200).json({
      success: true,
      message: `Leave ${status.toLowerCase()} successfully.`,
      leave: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};