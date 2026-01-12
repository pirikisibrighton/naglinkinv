import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Testimonials = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("googleUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ---------------- FETCH TESTIMONIALS ----------------
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials");
      const data = await res.json();
      setTestimonialsData(data);

      if (user) {
        const existing = data.find((t) => t.email === user.email);
        if (existing) {
          setReview(existing.text);
          setRating(existing.rating);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [user]);

  // ---------------- GOOGLE LOGIN ----------------
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const userData = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      setUser(userData);
      localStorage.setItem("googleUser", JSON.stringify(userData));
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  // ---------------- SUBMIT / UPDATE REVIEW ----------------
  const handleSubmitReview = async () => {
    if (!review.trim() || rating === 0) {
      toast.error("Please add a review and rating");
      return;
    }

    try {
      const res = await fetch("http://mwanawevhu-nexus.onrender.com/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          image: user.picture,
          rating,
          text: review,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const savedReview = await res.json();

      const filtered = testimonialsData.filter(
        (t) => t.email !== user.email
      );
      setTestimonialsData([savedReview, ...filtered]);

      toast.success("Review submitted successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-32"
      id="Testimonials"
    >
      {/* ---------------- TITLE ---------------- */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        CUSTOMER{" "}
        <span className="underline underline-offset-4 decoration-1 font-light">
          TESTIMONIALS
        </span>
      </h1>

      <p className="text-center text-gray-300 mb-12 max-w-80 mx-auto">
        Real Stories from Those Who Found Home with Us
      </p>

      {/* ---------------- TESTIMONIALS LIST ---------------- */}
      <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-4">
        {testimonialsData.map((testimonial, idx) => (
          <Motion.div
            key={idx}
            whileHover={{ scale: 1.04, y: -6 }}
            className="flex-shrink-0 w-[220px] sm:w-[260px] md:w-[320px] p-6 sm:p-8 bg-[#363636] shadow-lg rounded text-center"
          >
            {testimonial.image && (
              <img
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
            )}

            <h2 className="text-base sm:text-lg md:text-xl text-white font-semibold">
              {testimonial.name}
            </h2>

            <div className="flex justify-center gap-1 my-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>

            <p className="text-white text-xs sm:text-sm md:text-base font-light">
              "{testimonial.text}"
            </p>
          </Motion.div>
        ))}
      </div>

      {/* ---------------- LOGIN / REVIEW FORM ---------------- */}
      {!user ? (
        <div className="flex flex-col items-center gap-4 mt-10">
          <p className="text-gray-400 text-sm text-center">
            Sign in with Google to leave a review
          </p>

          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => toast.error("Google Sign-In Failed")}
          />
        </div>
      ) : (
        <div className="mt-16 max-w-xl mx-auto w-full px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-300 mb-6">
            Leave a Review
          </h2>

          <form className="flex flex-col gap-4">
            <div className="flex items-center gap-3 justify-center">
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <p className="text-gray-300 text-sm">
                Reviewing as <span className="font-semibold">{user.name}</span>
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              rows="4"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="px-4 py-3 rounded bg-transparent border border-gray-500 text-gray-300 focus:outline-none focus:border-white resize-none"
            />

            <button
              type="button"
              onClick={handleSubmitReview}
              className="bg-blue-600 text-white px-8 py-2 self-center"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </Motion.div>
  );
};

export default Testimonials;
