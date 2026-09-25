import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";

dotenv.config();
connectDB(); // MongoDB sanga connect garne

const app = express();

// --- Middleware ---
// Host nginx terminates TLS and sets X-Forwarded-*; trust one proxy hop so
// express-rate-limit reads the real client IP instead of throwing
// ERR_ERL_UNEXPECTED_X_FORWARDED_FOR.
app.set("trust proxy", 1);

app.use(helmet());

// Restrict browser origins when CORS_ORIGIN is configured (prod is
// same-origin, so this is a hardening measure); otherwise keep the previous
// permissive behavior for local development.
const corsOptions = process.env.CORS_ORIGIN
  ? { origin: process.env.CORS_ORIGIN.split(",").map((o) => o.trim()) }
  : {};
app.use(cors(corsOptions));

// Allow base64 image payloads stored by the gallery/route models.
app.use(express.json({ limit: "10mb" }));
// Morgan: "combined" feeds production log pipelines; "dev" is for local work.
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ message: "Off Route API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/routes", routeRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
