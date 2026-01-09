import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/testimonials", testimonialRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
