import supabase from "../config/supabase.js";

// ===========================================
// Get All Employees
// ===========================================
export const getAllEmployees = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("users")
      .select("id, username, role, created_at")
      .eq("role", "employee")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      totalEmployees: data.length,
      employees: data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};