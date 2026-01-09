import React from 'react';
import { services } from '../assets/assets';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ------------------ ANIMATIONS ------------------
const serviceVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const hoverImage = {
  scale: 1.08,
  transition: { duration: 0.4, ease: 'easeInOut' },
};

const hoverText = {
  scale: 1.04,
  y: -6,
  transition: { duration: 0.4, ease: 'easeInOut' },
};

// ------------------ QUOTES & NAMES MAP ------------------
const serviceQuotes = {
  Architecture: {
    text: "Architecture is a social act and the building is the result of our actions. If we can change the process, we can change the outcome. We change the world, because ARCHITECTURE is power!!",
    author: "Garai Nyandoro",
    degree: "B.Sc Arch",
    year: "2022",
    university: "NUST",
  },
  "Urban Planning": {
    text: "Urban planning is the art of shaping communities before they exist—where vision, movement, and structure unite to guide how cities grow and breathe.",
    author: "Exaviour P. Debwe",
    degree: "B.Sc UP",
    year: "2022",
    university: "GZU",
  },
  "Land Surveying": {
    text: "Land surveying is the foundation of every great structure—precision defining what will rise above the earth.",
    author: "Exaviour Debwe",
    degree: "B.Sc UP",
    year: "2022",
    university: "GZU",
  },
  Construction: {
    text: "Crafting Future Spaces with Precision and Passion. Where visionary design meets execution.",
    author: "Garai Nyandoro",
    degree: "B.Sc Arch",
    year: "2022",
    university: "NUST",
  },
};

// ------------------ ROUTES MAP ------------------
const serviceRoutes = {
  Architecture: "/architecture",
  "Urban Planning": "/urban-planning",
  "Land Surveying": "/land-surveying",
  Construction: "/construction",
};

const Services = () => {
  return (
    <Motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className='container mx-auto py-4 pt-12 sm:pt-10 px-6 md:px-20 lg:px-32 my-10 sm:my-20 w-full overflow-hidden'
      id='Services'
    >
      <h1 className='text-2xl sm:text-4xl mt-5 font-bold mb-2 text-center'>
        OUR <span className='underline underline-offset-4 decoration-1 font-light'>SERVICES</span>
      </h1>

      <p className='text-center text-gray-500 mb-20 max-w-80 mx-auto'>
        Crafting Spaces, Building Legacies—Explore Our Portfolio
      </p>

      {/* Services List Container */}
      <div className='flex flex-col mr-5 gap-20'>
        {services.map((service, index) => {
          const isSpecial =
            service.title === 'Urban Planning' || service.title === 'Construction';
          const quoteData = serviceQuotes[service.title];
          const serviceRoute = serviceRoutes[service.title];

          // --------------------- SPECIAL LAYOUT ---------------------
          if (isSpecial) {
            return (
              <Motion.div
                key={index}
                variants={serviceVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='flex flex-col lg:flex-row-reverse lg:gap-7 shadow-xl'
              >
                {/* Right side: Image */}
                <div className='flex flex-col lg:w-[76%] lg:-mr-24 items-center lg:items-start'>
                  <h3 className='text-white text-2xl sm:text-3xl font-semibold mb-4 tracking-wide text-center lg:text-right'>
                    {service.heading || service.title.toUpperCase()}
                  </h3>

                  <div className='relative overflow-hidden w-full'>
                    <Link to={serviceRoute}>
                      <Motion.img
                        src={service.image}
                        alt={service.title}
                        className='w-full h-full object-cover cursor-pointer'
                        style={{ minHeight: '300px', maxHeight: '460px' }}
                        whileHover={hoverImage}
                      />
                    </Link>

                    {/* VIEW SERVICES BUTTON ONLY ON IMAGE */}
                    <div className='absolute left-1/2 bottom-6 transform -translate-x-1/2 flex items-center gap-4 lg:left-6 lg:transform-none lg:translate-x-0'>
                      <Link
                        to={serviceRoute}
                        className='border border-white px-8 py-3 rounded text-center text-white sm:text-base hover:bg-white hover:text-black transition whitespace-nowrap'
                      >
                        View Services
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Left side text */}
                <Motion.div
                  whileHover={hoverText}
                  className='flex-1 p-8 lg:p-12 flex flex-col justify-center lg:-ml-24'
                  style={{ backgroundColor: '#363636' }}
                >
                  <p className='text-white text-xl sm:text-2xl mb-6 leading-relaxed font-light text-center lg:text-left'>
                    "{quoteData?.text}"
                  </p>

                  {/* Author */}
                  <p className='text-white text-lg sm:text-xl font-semibold text-center lg:text-left'>
                    {quoteData?.author}
                  </p>

                  {/* Degree | Year | University */}
                  <p className='text-gray-300 text-sm sm:text-base text-center lg:text-left'>
                    {quoteData?.degree} | {quoteData?.year} | {quoteData?.university}
                  </p>
                </Motion.div>
              </Motion.div>
            );
          }

          // --------------------- DEFAULT LAYOUT (Architecture + Surveying) ---------------------
          return (
            <Motion.div
              key={index}
              variants={serviceVariant}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='flex flex-col lg:flex-row lg:gap-7 shadow-xl'
            >
              {/* IMAGE SECTION */}
              <div className='flex flex-col lg:w-[76%] lg:-ml-24 items-center lg:items-start'>
                <h3 className='text-white text-2xl sm:text-3xl font-semibold mb-4 tracking-wide text-center lg:text-left'>
                  {service.heading || service.title.toUpperCase()}
                </h3>

                <div className='relative overflow-hidden w-full'>
                  <Link to={serviceRoute}>
                    <Motion.img
                      src={service.image}
                      alt={service.title}
                      className='w-full h-full object-cover cursor-pointer'
                      style={{ minHeight: '300px', maxHeight: '460px' }}
                      whileHover={hoverImage}
                    />
                  </Link>

                  {/* VIEW SERVICES BUTTON ONLY ON IMAGE */}
                  <div className='absolute left-1/2 bottom-6 transform -translate-x-1/2 flex items-center gap-4 lg:left-6 lg:transform-none lg:translate-x-0'>
                    <Link
                      to={serviceRoute}
                      className='border border-white px-8 py-3 rounded text-center text-white hover:bg-white hover:text-black transition whitespace-nowrap'
                    >
                      View Services
                    </Link>
                  </div>
                </div>
              </div>

              {/* QUOTE TEXT */}
              <Motion.div
                whileHover={hoverText}
                className='flex-1 p-8 lg:p-12 flex flex-col justify-center lg:-mr-24'
                style={{ backgroundColor: '#363636' }}
              >
                <p className='text-white text-xl sm:text-2xl mb-6 leading-relaxed font-light text-center lg:text-left'>
                  "{quoteData?.text}"
                </p>

                {/* Author */}
                <p className='text-white text-lg sm:text-xl font-semibold text-center lg:text-left'>
                  {quoteData?.author}
                </p>

                {/* Degree | Year | University */}
                <p className='text-gray-300 text-sm sm:text-base text-center lg:text-left'>
                  {quoteData?.degree} | {quoteData?.year} | {quoteData?.university}
                </p>
              </Motion.div>
            </Motion.div>
          );
        })}
      </div>
    </Motion.div>
  );
};

export default Services;
