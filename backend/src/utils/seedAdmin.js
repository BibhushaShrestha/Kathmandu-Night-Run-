// Yesle ek pataka chalayera pahilo admin user database ma banauna milcha
// Run garne tarika: npm run seed:admin

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email: "admin@kathmandunightrun.com" });
  if (existing) {
    console.log("Admin already exists, seed nagarikan.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    name: "Bibhusha Shrestha",
    email: "admin@kathmandunightrun.com",
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
