import express from "express";
import {
  verifyGoogleToken,
  addOrUpdateTestimonial,
  getTestimonials,
} from "../controllers/googleAuth.js";

const router = express.Router();

router.post("/login", verifyGoogleToken);
router.get("/", getTestimonials);
router.post("/", addOrUpdateTestimonial); // changed to addOrUpdate

export default router;
