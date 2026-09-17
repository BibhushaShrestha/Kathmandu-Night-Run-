import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    distance: { type: String, required: true },
    elevation: { type: String },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      default: "Moderate",
    },
    status: {
      type: String,
      enum: ["draft", "upcoming", "published", "completed"],
      default: "draft",
    },
    description: { type: String },
    thumb: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
