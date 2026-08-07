import supabase from "../config/supabase.js";

export const createNotification = async (employeeId, message) => {

  console.log("========== Notification ==========");
  console.log("Employee ID:", employeeId);
  console.log("Message:", message);

  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        employee_id: employeeId,
        message
      }
    ])
    .select();

  console.log("Inserted Data:", data);
  console.log("Insert Error:", error);

  if (error) {
    throw new Error(error.message);
  }

};