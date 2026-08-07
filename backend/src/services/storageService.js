// ============================================================
// Import UUID Generator
// Used to generate unique file names
// ============================================================
import { v4 as uuidv4 } from "uuid";

// ============================================================
// Import Supabase Client
// ============================================================
import supabase from "../config/supabase.js";

/* ===========================================================
   Upload File To Supabase Storage

   Purpose:
   Upload employee supporting document and
   return its public URL.
=========================================================== */

export const uploadDocument = async (file) => {

  // --------------------------------------------------------
  // No File Uploaded
  // --------------------------------------------------------
  if (!file) {
    return null;
  }

  // --------------------------------------------------------
  // Generate Unique File Name
  // --------------------------------------------------------
  const fileExtension = file.originalname.split(".").pop();

  const fileName = `${uuidv4()}.${fileExtension}`;

  // --------------------------------------------------------
  // Upload File
  // --------------------------------------------------------
  const { error } = await supabase.storage
    .from("leave-documents")
    .upload(fileName, file.buffer, {

      contentType: file.mimetype,

      upsert: false

    });

  // Upload Failed
  if (error) {
    throw new Error(error.message);
  }

  // --------------------------------------------------------
  // Generate Public URL
  // --------------------------------------------------------
  const { data } = supabase.storage
    .from("leave-documents")
    .getPublicUrl(fileName);

  // Return Public URL
  return data.publicUrl;

};