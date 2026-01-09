import Testimonial from "../models/Testimonials.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google Token
export const verifyGoogleToken = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    res.status(200).json({
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

// Add or update testimonial
export const addOrUpdateTestimonial = async (req, res) => {
  try {
    const { name, email, image, rating, text } = req.body;

    if (!name || !email || !rating || !text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user already has a review
    let testimonial = await Testimonial.findOne({ email });

    if (testimonial) {
      // Update existing review
      testimonial.rating = rating;
      testimonial.text = text;
      testimonial.image = image || testimonial.image;
      await testimonial.save();
    } else {
      // Create new review
      testimonial = await Testimonial.create({ name, email, image, rating, text });
    }

    res.status(200).json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
