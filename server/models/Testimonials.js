import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique ensures one review per user
    image: { type: String },
    rating: { type: Number, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
