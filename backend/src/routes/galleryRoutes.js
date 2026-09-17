import express from "express";
import protect from "../middleware/auth.js";
import {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", protect, createGalleryItem);
router.put("/:id", protect, updateGalleryItem);
router.delete("/:id", protect, deleteGalleryItem);

export default router;
