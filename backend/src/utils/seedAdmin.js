// Yesle ek pataka chalayera pahilo admin user database ma banauna milcha
// Run garne tarika: npm run seed:admin

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();

// Overridable so production never seeds the default credentials.
const ADMIN_NAME = process.env.ADMIN_NAME || "Bibhusha Shrestha";
// Match the Admin model, which lowercases emails: a mixed-case ADMIN_EMAIL
// would miss the existing-admin lookup and then trip the unique index.
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@offroute.com").trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists, seed nagarikan.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await Admin.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: hashedPassword,
    role: "Administrator",
  });

  console.log("Admin user created successfully!");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
