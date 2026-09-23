import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    event: { type: String }, // event name as free text (matches admin dropdown)
    date: { type: String },
    imageUrl: { type: String, required: true }, // base64 or URL
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);