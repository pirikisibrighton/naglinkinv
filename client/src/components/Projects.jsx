import React, { useState, useEffect } from 'react'
import { projectsData, assets } from '../assets/assets';
import { motion as Motion } from 'framer-motion'

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(projectsData.length);
      } else {
        setCardsToShow(1);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length)
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1)
  }

  return (
    <Motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' 
      id='Projects'
    >
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        PROJECTS{' '}
        <span className="underline underline-offset-4 decoration-1 font-light">
          COMPLETED
        </span>
      </h1>
      <p className='text-center text-gray-300 mb-8 max-w-80 mx-auto'>
        Crafting Spaces, Building Legacies—Explore Our Portfolio
      </p>

      {/* slider buttons */}
      <div className='flex justify-end items-center mb-8'>
        {/* Removed rounded from buttons for consistency */}
        <button onClick={prevProject} className='p-3 bg-gray-200 rounded-none mr-2 hover:bg-gray-300 transition-colors' aria-label='Previous Project'>
          <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button onClick={nextProject} className='p-3 bg-gray-200 rounded-none mr-2 hover:bg-gray-300 transition-colors' aria-label='Next Project'>
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>

      {/* project slider container */}
      <div className='overflow-hidden'>
        <div
          className='flex gap-8 transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)` }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
              {/* Removed rounded from image */}
              <img src={project.image} alt={project.title} className='w-full h-auto mb-14 rounded-none' />
              
              <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                {/* Updated:
                  1. bg-[#363636] to match QuoteCard
                  2. rounded-none for sharp corners
                  3. text-white and text-gray-300 for readability
                */}
                <div className='inline-block bg-[#363636] w-3/4 px-4 py-2 shadow-xl rounded-none'>
                  <h2 className='text-xl font-semibold text-white'>
                    {project.title}
                  </h2>
                  <p className='text-gray-300 text-sm'>
                    {project.price} <span className='px-1'>|</span> {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Motion.div>
  )
}

export default Projects