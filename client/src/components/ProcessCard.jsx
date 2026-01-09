import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProcessCard = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={false}
      className="w-full bg-[#363636] rounded-none overflow-hidden border border-white/10"
    >
      {/* QUESTION HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <h3 className="text-white text-lg lg:text-xl font-medium">
          {question}
        </h3>

        <span className="text-grey-900">
  <motion.svg
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </motion.svg>
</span>
      </button>

      {/* ANSWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-6 pb-6"
          >
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProcessCard;
