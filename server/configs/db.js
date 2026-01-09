import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydatabase";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // no options needed
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // exit process with failure
  }
};
