import React from 'react'
import Navbar from './Navbar'
import { motion as Motion } from 'framer-motion'
import { background } from '../assets/assets'

const Header = () => {
  const [BgVideo1, BgVideo2] = background[0].videos

  return (
    <div className="relative min-h-screen w-screen overflow-hidden pt-24">

      {/* BACKGROUND VIDEOS */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "fadeVideo1 16s infinite" }}
          src={BgVideo1}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "fadeVideo2 16s infinite" }}
          src={BgVideo2}
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10 w-full h-full"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* CENTERED HERO CONTENT */}
      <Motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 min-h-[calc(100vh-6rem)]
                   flex flex-col items-center justify-center
                   w-full
                   px-4 sm:px-6 md:px-20 lg:px-32
                   text-center text-white
                   box-border"
      >
        {/* HEADING */}
        <h2
          className="font-semibold leading-tight
                     max-w-4xl mx-auto
                     text-3xl sm:text-4xl md:text-6xl lg:text-[82px]"
        >
          NYIKA INOVAKWA NEVENE VAYO
        </h2>

        {/* BUTTONS */}
        <div
          className="mt-12 grid grid-cols-2 gap-3
                     sm:grid-cols-4 sm:gap-4
                     max-w-4xl w-full mx-auto"
        >
          {[
            "ARCHITECTURE",
            "URBAN PLANNING",
            "LAND SURVEYING",
            "CONSTRUCTION",
          ].map((item) => (
            <a
              key={item}
              href="#Projects"
              className="block text-xs sm:text-sm md:text-base
                         border border-white rounded
                         px-3 py-2 sm:px-6 sm:py-3
                         text-center leading-tight
                         w-full"
            >
              {item}
            </a>
          ))}
        </div>
      </Motion.div>
    </div>
  )
}

export default Header
