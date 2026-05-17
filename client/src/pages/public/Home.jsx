import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PackageSearch } from "lucide-react";

import RequestQuoteModal from "../../components/RequestQuoteModal";

import Services from "./Services";
import About from "./About";
import Fleet from "./Fleet";
import Contact from "./Contact";

import hero1 from "../../assets/images/hero/DSC05274.jpg";
import hero2 from "../../assets/images/hero/DSC05280.jpg";
import hero3 from "../../assets/images/hero/DSC05284.jpg";
import hero4 from "../../assets/images/hero/DSC05295.jpg";
import hero5 from "../../assets/images/hero/DSC05311.jpg";
import hero6 from "../../assets/images/hero/DSC05400.jpg";
import hero7 from "../../assets/images/hero/DSC05403.jpg";

import serviceVideo from "../../assets/videos/service-video.mp4";

function Home() {
  const images = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];
  const [current, setCurrent] = useState(0);

  const [showQuoteForm, setShowQuoteForm] = useState(false);

const [quoteData, setQuoteData] = useState({
  pickupCity: "",
  deliveryCity: "",
  goodsType: "",
  preferredService: "",
});

const inputClass =
  "w-full rounded-2xl border-2 border-sky-200 bg-white/90 px-4 py-3 text-blue-950 outline-none transition placeholder:text-slate-500 focus:border-blue-700";

const labelClass = "mb-2 block font-bold text-blue-950";

const modalPrimaryButton =
  "flex items-center justify-center gap-2 rounded-lg border border-blue-950 bg-blue-950 px-5 py-2 text-sm font-semibold text-white transition hover:border-blue-500 hover:bg-blue-700";

const modalCancelButton =
  "flex items-center justify-center gap-2 rounded-lg border border-blue-950 px-5 py-2 text-sm font-semibold text-blue-950 transition hover:border-blue-500 hover:bg-blue-700 hover:text-white";

const handleQuoteRequest = async (e) => {
  e.preventDefault();

  console.log("Homepage quote data:", quoteData);

  setShowQuoteForm(false);

  setQuoteData({
    pickupCity: "",
    deliveryCity: "",
    goodsType: "",
    preferredService: "",
  });
};

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(slider);
  }, [images.length]);

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-950 via-sky-300 to-white">
      {/* HERO SECTION */}
      <section id="Home" className="px-2 pb-8 lg:px-4">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative min-h-[80vh] overflow-hidden rounded-none rounded-bl-[70px] border border-white/40 bg-white/10 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]}
                alt="Logistics truck"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-blue-950/20" />

            <div className="relative z-10 flex min-h-[80vh] flex-col justify-center px-6 py-16 md:px-14 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl"
              >
                <p className="mb-5 inline-flex rounded-full border border-white/40 bg-white/15 px-5 py-2 text-sm font-semibold text-white shadow backdrop-blur">
                  Trusted Howo & Tipper Truck Logistics
                </p>

                <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
                  Moving your cargo safely,
                  <span className="block text-sky-300">
                    from pickup to delivery.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-100 md:text-xl">
                  Request a quote, book transport orders, and track your
                  deliveries through a modern logistics system built for
                  reliable trucking operations.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
  type="button"
  onClick={() => setShowQuoteForm(true)}
  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white shadow backdrop-blur transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
>
  Request Quote
  <ArrowRight size={22} />
</button>

                  <Link
                    to="/track-order"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-slate-900 shadow transition hover:bg-blue-700 hover:text-white"
                  >
                    Track Order
                    <PackageSearch size={22} />
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    current === index
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="Services" className="relative">
        <div className="px-4 pt-16 sm:px-6 md:px-12 lg:px-20">
          <div className="mb-12 text-center">
            <h1 className="mb-2 text-3xl font-bold text-blue-950 sm:text-5xl">
              OUR{" "}
              <span className="font-light underline decoration-1 underline-offset-8">
                SERVICES
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-medium leading-8 text-slate-700">
              Reliable truck hire, tipper hire, cargo movement, and
              professional delivery support for your transport needs.
            </p>
          </div>
        </div>

        {/* FLOATING VIDEO CARD */}
        <div className="pointer-events-none absolute right-4 top-[170px] z-30 hidden lg:block">
          <div className="h-[430px] w-[430px] overflow-hidden bg-gradient-to-r from-blue-950 via-sky-500 to-blue-800 p-7 shadow-2xl">
            <video
              src={serviceVideo}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <Services />
      </section>

      {/* ABOUT */}
      <section id="About">
        <About />
      </section>

      {/* PORTFOLIO / FLEET */}
      <section id="Portfolio">
        <Fleet />
      </section>

      {/* CONTACT */}
      <section id="Contact">
        <Contact />
      </section>
      {showQuoteForm && (
  <RequestQuoteModal
    quoteData={quoteData}
    setQuoteData={setQuoteData}
    onSubmit={handleQuoteRequest}
    onClose={() => setShowQuoteForm(false)}
    inputClass={inputClass}
    labelClass={labelClass}
    modalPrimaryButton={modalPrimaryButton}
    modalCancelButton={modalCancelButton}
  />
)}
    </main>
  );
}

export default Home;