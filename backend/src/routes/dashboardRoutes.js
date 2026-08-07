import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  employeeDashboard
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(

  "/employee",

  authMiddleware,

  employeeDashboard

);

export default router;