import React from 'react';
import { assets } from '../assets/assets';
import { motion as Motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    { src: assets.archie, name: "Exaviour P Debwe", title: "Core Founder | Urban Planner" },
    { src: assets.architecture1, name: "Garai Nyandoro", title: "CEO | Architect" },
    { src: assets.architecture2, name: "Brighton Pirikisi", title: "Design Systems Lead" },
    { src: assets.architecture3, name: "Munashe Gwara", title: "Technology Director" },
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
      id="About"
    >
      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        ABOUT{' '}
        <span className="underline underline-offset-4 decoration-1 font-light">
          OUR BRAND
        </span>
      </h1>

      <p className="text-gray-300 max-w-80 text-center mb-8">
        Passionate About Properties, Dedicated to Your Vision
      </p>

      <div className="flex flex-col md:flex-row items-center gap-20 w-full">
        
        {/* Left column: Our Team */}
        <div className="flex flex-col items-center w-full sm:w-1/2 max-w-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-6">
            Our Team
          </h2>

          {/* UPDATED GRID FOR SMALL SCREENS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-4 w-full">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group">
                
                {/* UPDATED HEIGHT FOR SMALL SCREENS */}
                <img
                  src={member.src}
                  alt={member.name}
                  className="w-full h-48 sm:h-80 object-cover rounded-none"
                />
                
                {/* Floating Info Container */}
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-[#363636] px-4 py-3 shadow-2xl text-center w-5/6 rounded-none">
                  <p className="text-white font-bold text-sm sm:text-base">
                    {member.name}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    {member.title}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col items-center md:items-start text-gray-300 w-full sm:w-1/2">
          <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
            <div>
              <p className="text-4xl font-medium text-gray-300">4+</p>
              <p>Years of Excellence</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-300">10+</p>
              <p>Projects Completed</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-300">6+</p>
              <p>Cities Served</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-300">7+</p>
              <p>Ongoing Projects</p>
            </div>
          </div>

          <p className="my-10 max-w-lg">
            Masvingo based Mwanawevhu-Nexus is committed to transforming spaces 
            with innovation and precision. We specialize in architectural design, 
            urban planning, land surveying, and modern construction solutions, 
            combining cutting-edge methods with practical expertise.
          </p>

          <button className="bg-blue-600 text-white px-8 py-2 rounded-none">
            Learn more
          </button>
        </div>
      </div>
    </Motion.div>
  );
};

export default About;
