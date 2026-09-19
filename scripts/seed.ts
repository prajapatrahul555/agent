import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import dbConnect from "../lib/db";

async function seed() {
  await dbConnect();

  const password = await bcrypt.hash("password123", 10);

  const users = [
    { name: "Super Admin", email: "admin@sms.com", password, role: "Admin" },
    { name: "John Teacher", email: "teacher@sms.com", password, role: "Teacher" },
    { name: "Jane Student", email: "student@sms.com", password, role: "Student" },
    { name: "Parent One", email: "parent@sms.com", password, role: "Parent" },
  ];

  await User.deleteMany({});
  await User.insertMany(users);

  console.log("Database seeded successfully!");
  process.exit();
}

seed();
