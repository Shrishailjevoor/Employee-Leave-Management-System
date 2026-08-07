// ============================================================
// Import Multer
// ============================================================
import multer from "multer";

// ============================================================
// Store uploaded files in memory
// ============================================================
const storage = multer.memoryStorage();

// ============================================================
// Allowed MIME Types
// ============================================================
const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png"
];

// ============================================================
// File Filter
// ============================================================
const fileFilter = (req, file, cb) => {

  console.log("Original Name:", file.originalname);
  console.log("MIME Type:", file.mimetype);

  // File extension
  const extension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  // Allowed extensions
  const allowedExtensions = [
    "pdf",
    "jpg",
    "jpeg",
    "png"
  ];

  if (
    allowedMimeTypes.includes(file.mimetype) ||
    allowedExtensions.includes(extension)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF, JPG, JPEG and PNG files are allowed."),
      false
    );
  }

};

// ============================================================
// Multer Configuration
// ============================================================
const upload = multer({

  storage,

  fileFilter,

  limits: {

    // 5 MB
    fileSize: 5 * 1024 * 1024

  }

});

// ============================================================
// Export Multer
// ============================================================
export default upload;