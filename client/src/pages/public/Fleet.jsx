import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import truck1 from "../../assets/images/fleet/DSC05324.jpg";
import truck2 from "../../assets/images/fleet/DSC05309.jpg";
import truck3 from "../../assets/images/fleet/DSC05272.jpg";
import truck4 from "../../assets/images/fleet/DSC05336.jpg";
import truck5 from "../../assets/images/fleet/DSC05339.jpg";
import truck6 from "../../assets/images/fleet/DSC05267.jpg";
import truck7 from "../../assets/images/fleet/DSC05280.jpg";
import truck8 from "../../assets/images/fleet/DSC05315.jpg";

function Fleet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  const fleetData = [
    {
      title: "Howo Cargo Truck",
      description: "Reliable truck for business cargo and long-distance transport.",
      image: truck1,
    },
    {
      title: "Howo Heavy Duty",
      description: "Strong Hino truck for bulk goods and commercial deliveries.",
      image: truck2,
    },
    {
      title: "Tipper Truck",
      description: "Suitable for sand, stones, gravel, and construction materials.",
      image: truck3,
    },
    {
      title: "Cargo Fleet",
      description: "Efficient fleet support for company and customer logistics.",
      image: truck4,
    },
    {
      title: "Bulk Transport",
      description: "Built for large load movement and scheduled transport work.",
      image: truck5,
    },
    {
      title: "Construction Truck",
      description: "Perfect for construction, mining, and site delivery operations.",
      image: truck6,
    },
    {
      title: "Fleet Lineup",
      description: "Multiple trucks ready for reliable transportation services.",
      image: truck7,
    },
    {
      title: "Delivery Truck",
      description: "Professional cargo movement from pickup to final delivery.",
      image: truck8,
    },
  ];

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1280) {
        setCardsToShow(4);
      } else if (window.innerWidth >= 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 640) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const maxIndex = Math.max(fleetData.length - cardsToShow, 0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-950 via-sky-300 to-white">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="container mx-auto w-full overflow-hidden px-6 py-16 md:px-20 lg:px-24"
      >
        <h1 className="mb-2 text-center text-3xl font-bold text-blue-950 sm:text-5xl">
          OUR{" "}
          <span className="font-light underline decoration-1 underline-offset-8">
            FLEET
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-center text-lg font-medium text-slate-700">
          Explore our reliable Hino trucks and tippers ready for cargo,
          construction, mining, and bulk transport.
        </p>

        <div className="mb-8 flex items-center justify-end">
          <button
            onClick={prevProject}
            className="mr-2 bg-white p-3 text-blue-950 shadow-md transition hover:bg-blue-700 hover:text-white"
            aria-label="Previous Truck"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextProject}
            className="mr-2 bg-white p-3 text-blue-950 shadow-md transition hover:bg-blue-700 hover:text-white"
            aria-label="Next Truck"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
            }}
          >
            {fleetData.map((truck, index) => (
              <div
                key={index}
                className="relative flex-shrink-0"
                style={{
                  width: `calc(${100 / cardsToShow}% - ${
                    ((cardsToShow - 1) * 32) / cardsToShow
                  }px)`,
                }}
              >
                <img
                  src={truck.image}
                  alt={truck.title}
                  className="mb-16 h-[430px] w-full rounded-none object-cover shadow-2xl"
                />

                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <div className="inline-block w-4/5 rounded-none bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800 px-5 py-4 text-center shadow-xl">
                    <h2 className="text-2xl font-semibold text-white">
                      {truck.title}
                    </h2>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-100">
                      {truck.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default Fleet;