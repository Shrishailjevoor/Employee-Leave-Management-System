import supabase from "../config/supabase.js";

export async function logActivity(username, role, activity) {
  await supabase
    .from("activity_logs")
    .insert([
      {
        username,
        role,
        activity,
      },
    ]);
}