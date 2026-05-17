import { motion } from "framer-motion";

import team1 from "../../assets/images/fleet/DSC05267.jpg";
import team2 from "../../assets/images/fleet/DSC05270.jpg";
import team3 from "../../assets/images/fleet/DSC05272.jpg";
import team4 from "../../assets/images/fleet/DSC05274.jpg";

function About() {
  const teamMembers = [
    {
      src: team1,
      name: "Operations Team",
      title: "Fleet & Order Management",
    },
    {
      src: team2,
      name: "Admin Team",
      title: "Customer Support & Bookings",
    },
    {
      src: team3,
      name: "Drivers Team",
      title: "Delivery & Status Updates",
    },
    {
      src: team4,
      name: "Logistics Team",
      title: "Tracking & Transport Planning",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-r from-blue-950 via-sky-300 to-white">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="container mx-auto flex w-full flex-col items-center justify-center overflow-hidden px-4 py-14 sm:px-6 md:px-20 lg:px-32"
        id="About"
      >
        <h1 className="mb-2 text-center text-2xl font-bold text-blue-950 sm:text-4xl">
          ABOUT{" "}
          <span className="font-light underline decoration-1 underline-offset-4">
            OUR BRAND
          </span>
        </h1>

        <p className="mb-8 max-w-md text-center text-base font-medium text-slate-700 sm:text-lg">
          Reliable Transport, Professional Service, Dedicated to Your Cargo
          Movement
        </p>

        <div className="flex w-full flex-col items-center gap-20 md:flex-row">
          {/* LEFT COLUMN */}
          <div className="flex w-full max-w-lg flex-col items-center sm:w-1/2">
            <h2 className="mb-6 text-xl font-semibold text-blue-950 sm:text-2xl">
              Our Team
            </h2>

            <div className="grid w-full grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2">
              {teamMembers.map((member, index) => (
                <div key={index} className="group relative">
                  <img
                    src={member.src}
                    alt={member.name}
                    className="h-48 w-full rounded-none object-cover shadow-2xl sm:h-80"
                  />

                  <div className="absolute bottom-[-20px] left-1/2 w-5/6 -translate-x-1/2 rounded-none bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800 px-4 py-3 text-center shadow-2xl">
                    <p className="text-sm font-bold text-white sm:text-base">
                      {member.name}
                    </p>

                    <p className="text-xs text-slate-100 sm:text-sm">
                      {member.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex w-full flex-col items-center text-slate-700 md:items-start sm:w-1/2">
            <div className="grid w-full grid-cols-2 gap-6 md:gap-10 2xl:pr-28">
              <div>
                <p className="text-4xl font-medium text-blue-950">20+</p>
                <p className="font-medium">Howo Trucks</p>
              </div>

              <div>
                <p className="text-4xl font-medium text-blue-950">20+</p>
                <p className="font-medium">Tipper Trucks</p>
              </div>

              <div>
                <p className="text-4xl font-medium text-blue-950">24/7</p>
                <p className="font-medium">Order Tracking</p>
              </div>

              <div>
                <p className="text-4xl font-medium text-blue-950">100%</p>
                <p className="font-medium">Customer Focus</p>
              </div>
            </div>

            <p className="my-10 max-w-lg text-base font-medium leading-8 sm:text-lg">
              Naglink Investments is committed to providing reliable truck
              hire, tipper hire, bulk cargo movement, and professional transport
              services. Our platform helps customers request quotes, create
              orders, track deliveries, and communicate with the company from
              pickup to delivery.
            </p>

            <button className="rounded-none bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800 px-8 py-3 font-semibold text-white shadow-lg transition hover:opacity-90">
              Learn more
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default About;