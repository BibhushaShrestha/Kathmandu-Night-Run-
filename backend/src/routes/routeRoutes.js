import express from "express";
import protect from "../middleware/auth.js";
import {
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
} from "../controllers/routeController.js";

const router = express.Router();

router.get("/", getRoutes);
router.post("/", protect, createRoute);
router.put("/:id", protect, updateRoute);
router.delete("/:id", protect, deleteRoute);

export default router;
