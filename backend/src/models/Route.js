import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    distance: { type: String, required: true },
    elevation: { type: String },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      default: "Moderate",
    },
    location: { type: String }, // e.g. "Teku to Sankhamul"
    description: { type: String },
    image: { type: String }, // route/map photo, base64 or URL
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Route", routeSchema);
