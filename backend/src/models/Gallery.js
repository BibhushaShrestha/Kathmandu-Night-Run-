import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String },
    category: { type: String, default: "General" },
    eventRef: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
