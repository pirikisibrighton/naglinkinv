import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "https://mwanawevhu-nexus.onrender.com",
      "https://mwanawevhu-nexus-1.onrender.com",
    ],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Routes
app.use("/api/testimonials", testimonialRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
