import React from "react";

const GlowButton = ({ text }) => {
  return (
    <button
      className="
        relative px-10 py-3 rounded-full font-semibold tracking-widest
        text-purple-300 bg-black/30 backdrop-blur-md
        border border-purple-600/40
        shadow-[0_0_20px_rgba(128,0,255,0.4)]
        hover:shadow-[0_0_35px_rgba(128,0,255,0.8)]
        overflow-hidden transition-all duration-300 group
      "
    >
      {/* Soft Glow Behind */}
      <span className="absolute inset-0 rounded-full bg-purple-600 opacity-10 blur-xl"></span>

      {/* Hover Sweep Light */}
      <span
        className="
        absolute inset-0 translate-x-[-150%]
        bg-gradient-to-r from-transparent via-purple-400/40 to-transparent
        skew-x-[25deg]
        group-hover:translate-x-[150%]
        transition-transform duration-700 ease-out
      "
      ></span>

      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default GlowButton;
