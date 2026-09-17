import express from "express";
import protect from "../middleware/auth.js";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Public routes - website ma jasle pani herna paos
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin-only routes - login bhaeko token chahincha
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
