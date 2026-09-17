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
    startPoint: { type: String },
    endPoint: { type: String },
    description: { type: String },
    mapImage: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Route", routeSchema);
