import express from "express";

import { getAllEmployees } from "../controllers/employeeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("manager"),
  getAllEmployees
);

export default router;