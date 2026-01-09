import React from 'react';
import { motion as Motion } from 'framer-motion';

const QuoteCard = ({ text, author, className = '' }) => {
  return (
    <Motion.div
      whileHover={{
        scale: 1.04,
        y: -6,
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
      className={`flex flex-col justify-center p-8 lg:p-12 bg-[#363636] ${className}`}
    >
      <p className="text-white text-xl sm:text-2xl font-light leading-relaxed mb-6">
        "{text}"
      </p>

      <p className="text-white text-lg sm:text-xl font-semibold">
        {author}
      </p>
    </Motion.div>
  );
};

export default QuoteCard;
