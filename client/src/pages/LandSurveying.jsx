import React, { useState, useEffect } from "react";
import {
  assets,
  servicespicturesLandSurveying,
  serviceDetailsLandSurveying,
} from "../assets/assets";
import ProcessCard from "../components/ProcessCard";

/* ✅ CLIENT PROCESS DATA */
const processSteps = [
  {
    question: "How do we start the process?",
    answer:
      "You begin by contacting us via phone, email, or our website. We schedule an initial consultation to understand your goals, site conditions, budget, and expectations.",
  },
  {
    question: "What happens after the first consultation?",
    answer:
      "We prepare a surveying brief and conduct a site assessment. This ensures accurate measurement, boundary verification, and project requirements before planning begins.",
  },
  {
    question: "How is the survey conducted?",
    answer:
      "We use modern surveying equipment to map out land contours, boundaries, and features. Data is analyzed and visualized to guide design, construction, and planning decisions.",
  },
  {
    question: "Do you provide technical drawings?",
    answer:
      "Yes. After the survey, we prepare detailed site plans, topographic maps, and documentation suitable for legal and construction purposes.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are structured in stages aligned with project milestones such as initial survey, data analysis, and final documentation.",
  },
  {
    question: "Do you assist during project execution?",
    answer:
      "We provide consultation and verification services to ensure construction or development aligns accurately with surveyed data.",
  },
];

const LandSurveying = () => {
  const ribbonColor = "#b59b8a";
  const imageHeightClass = "h-[22rem] sm:h-[30rem]";
  const categories = [
    "Boundary Surveying",
    "Topographic Surveying",
    "Construction Staking",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Boundary Surveying");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [fullDetailText, setFullDetailText] = useState("");

  // Filter images based on selected category
  const filteredImages = servicespicturesLandSurveying.filter(
    (item) => item.title === selectedCategory
  );

  useEffect(() => {
    setCurrentIndex(0);
    setIsDetailOpen(false);
  }, [selectedCategory]);

  useEffect(() => {
    if (filteredImages.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 2 >= filteredImages.length ? 0 : prev + 2
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredImages]);

  const img1 = filteredImages[currentIndex]?.image;
  const img2 =
    filteredImages[currentIndex + 1]?.image || filteredImages[0]?.image;

  const serviceDetail =
    serviceDetailsLandSurveying[selectedCategory]?.fullText ||
    "No details available for this service.";

  const summaryText = serviceDetail.split(" ").slice(0, 5).join(" ") + "...";

  const handleReadMore = () => {
    setFullDetailText(serviceDetail);
    setIsDetailOpen(true);
  };

  return (
    <div className="font-poppins text-white">
      {/* HERO SECTION */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.architecture_hero})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-10 lg:px-24 text-white">
          <h1 className="text-4xl lg:text-6xl font-semibold mb-4">
            Land Surveying Solutions
          </h1>
          <p className="max-w-2xl text-sm sm:text-lg">
            Providing accurate, professional, and reliable land surveying services
            to guide your construction, planning, and development projects.
          </p>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <div className="text-center mt-10 px-10 lg:px-24">
        <h2 className="text-3xl font-semibold">What We Do</h2>
        <p className="text-gray-400 mt-5 mb-6">
          Delivering precision in land measurement, topographic mapping, and boundary verification.
        </p>
      </div>

      {/* SERVICE CARDS */}
      <section className="px-10 lg:px-24 pb-1 py-16 bg-transparent">
        <div className="flex flex-col md:flex-row justify-center items-start space-x-0 md:space-x-10 lg:space-x-16">
          {categories.map((cat, index) => (
            <div
              key={cat}
              className={`flex flex-col items-center max-w-md w-full md:w-auto ${
                index === 2 ? "mt-20" : index === 1 ? "mt-10" : "mt-0"
              } mb-6 md:mb-0`}
            >
              <div
                className="relative p-2"
                style={{ border: `1px solid ${ribbonColor}` }}
              >
                <img
                  src={
                    filteredImages[index]?.image ||
                    servicespicturesLandSurveying.find((i) => i.title === cat)
                      ?.image
                  }
                  alt={cat}
                  className={`w-full ${imageHeightClass} object-cover`}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: `20px solid ${ribbonColor}` }}
                />
              </div>
              <h3 className="text-lg font-normal mt-4">{cat}</h3>
              <div className="text-xl leading-none text-gray-400 font-light mt-1">|</div>
              <div className="text-4xl font-light text-[#b59b8a] mt-1">
                {`0${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="bg-transparent px-4 sm:px-10 lg:px-24 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-2">OUR PORTFOLIO</h2>
        <p className="text-sm text-gray-300 mb-10">
          Explore our portfolio and discover detailed service insights across
          our core land surveying projects.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* FILTER BUTTONS */}
          <div className="absolute top-0 left-0 right-0 flex justify-center pt-6 z-20 px-0">
            <div className="flex flex-nowrap w-max gap-2 md:gap-3 items-center bg-black/40 px-2 sm:px-4 py-2 rounded-xl backdrop-blur-md pointer-events-auto overflow-x-auto mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 cursor-pointer border px-2 sm:px-4 md:px-8 py-1 sm:py-2 md:py-3 rounded text-center text-xs sm:text-sm md:text-base transition-colors duration-500 ${
                    selectedCategory === cat
                      ? "bg-blue-900 text-white border-blue-900"
                      : "border-white text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* FLOATING SUMMARY BAR */}
          {!isDetailOpen && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 z-20 pointer-events-none">
              <div className="flex flex-row items-center bg-black/70 px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md pointer-events-auto max-w-full sm:max-w-[90%] mx-auto">
                <p className="text-sm sm:text-lg font-light text-white sm:mr-2 text-center sm:text-left whitespace-nowrap">
                  <span className="inline sm:hidden">
                    {serviceDetail.split(" ").slice(0, 2).join(" ")}...
                  </span>
                  <span className="hidden sm:inline">{summaryText}</span>
                </p>
                <button
                  onClick={handleReadMore}
                  className="px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded transition-transform transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  ReadMore
                </button>
              </div>
            </div>
          )}

          {/* IMAGES */}
          <div className="relative h-[70vh] sm:h-[90vh] w-full overflow-hidden">
            <img
              src={img1}
              alt={selectedCategory}
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>
          <div className="relative h-[70vh] sm:h-[90vh] w-full overflow-hidden">
            <img
              src={img2}
              alt={selectedCategory}
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>

          {/* MODAL */}
          {isDetailOpen && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-black/40 p-6 sm:p-8 rounded-lg shadow-2xl max-w-full sm:max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {selectedCategory} Details
                </h3>
                <p className="text-gray-300 mb-6 whitespace-pre-wrap">
                  {fullDetailText}
                </p>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-transform transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="text-center mt-15 px-10 lg:px-24">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-white">
          Talk to Us About Your Land Project
        </h2>
        <p className="text-sm text-gray-300 mb-10">
          Let’s bring your project to life with accurate and professional land surveying services.
        </p>
        <div className="w-full flex flex-col items-center space-y-6 mb-12">
          {processSteps.map((step, index) => (
            <div key={index} className="w-full lg:w-3/4">
              <ProcessCard question={step.question} answer={step.answer} />
            </div>
          ))}
        </div>
        <button className="bg-blue-600 text-white py-2 px-12 mb-10 rounded">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default LandSurveying;
