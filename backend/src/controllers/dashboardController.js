import supabase from "../config/supabase.js";

export const employeeDashboard = async (req, res) => {

  try {

    const employeeId = req.user.id;

    const { data, error } = await supabase
      .from("leave_requests")
      .select("status")
      .eq("employee_id", employeeId);

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

    const stats = {

      total: data.length,

      pending: data.filter(
        l => l.status === "Pending"
      ).length,

      approved: data.filter(
        l => l.status === "Approved"
      ).length,

      rejected: data.filter(
        l => l.status === "Rejected"
      ).length

    };

    return res.status(200).json({

      success: true,

      stats

    });

  }

  catch (error) {

    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};