import supabase from "../config/supabase.js";
import { uploadDocument } from "../services/storageService.js";

export const applyLeave = async (req, res) => {
    
  try {
    const employeeId = req.user.id;

    const {
      reason,
      start_date,
      end_date
    } = req.body;

    if (!reason || !start_date || !end_date) {
      return res.status(400).json({
        success: false,
        message: "Reason, start date and end date are required."
      });
    }

    if (new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be greater than end date."
      });
    }

    let documentUrl = null;

    if (req.file) {
      documentUrl = await uploadDocument(req.file);
    }

    const { data, error } = await supabase
      .from("leave_requests")
      .insert([
        {
          employee_id: employeeId,
          reason,
          start_date,
          end_date,
          document_url: documentUrl,
          status: "Pending"
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully.",
      leave: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/* ===========================================================
   Get My Leave Requests

   Purpose:
   - Fetch all leave requests of the logged-in employee
   - Sort by newest first

   Protected Route:
   Requires JWT Authentication
=========================================================== */

export const getMyLeaves = async (req, res) => {

  try {

    // --------------------------------------------------------
    // Get Logged-in Employee ID
    // --------------------------------------------------------
    const employeeId = req.user.id;

    // --------------------------------------------------------
    // Fetch Employee Leave History
    // --------------------------------------------------------
    const { data, error } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("employee_id", employeeId)
      .order("created_at", { ascending: false });

    // Database Error
    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

    // --------------------------------------------------------
    // Success Response
    // --------------------------------------------------------
    return res.status(200).json({

      success: true,
      totalLeaves: data.length,
      leaves: data

    });

  } catch (error) {

    return res.status(500).json({

      success: false,
      message: error.message

    });

  }

};