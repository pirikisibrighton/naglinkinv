import { motion } from "framer-motion";

import serviceHero from "../../assets/images/hero/DSC05280.jpg";

import hinoImg from "../../assets/images/services/hino.jpg";
import tipperImg from "../../assets/images/services/tipper.jpg";
import bulkImg from "../../assets/images/services/bulk.jpg";

function Services() {
  const services = [
    {
      title: "LTL Shipping",
      image: hinoImg,
      description:
        "Cost-effective shared load service within most of the SADC region-ideal for smaller shippments and flexible delivery needs",
      number: "01",
      margin: "mt-0",
      borderGradient: "linear-gradient(to right, #ffffff, #bae6fd, #38bdf8)",
      descClass:
        "bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800 text-white",
    },
    {
      title: "FTL Shipping",
      image: tipperImg,
      description:
        "Specialised full truckload service across Sothern Africa-connecting businesses with reliable,secure transport solutions.",
      number: "02",
      margin: "mt-0 lg:mt-12",
      borderGradient: "linear-gradient(to right, #ffffff, #bae6fd, #38bdf8)",
      descClass:
        "bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800 text-white",
    },
    {
      title: "Bulk Shipping",
      image: bulkImg,
      description:
        "Efficient bulk cargo solutions-specialised in Agricultural products and industrial materials throughout Zimbabwe and SADC.  ",
      number: "03",
      margin: "mt-0 lg:mt-24",
      borderGradient: "linear-gradient(to right, #1e1b4b, #581c87, #7e22ce)",
      descClass:
        "bg-gradient-to-r from-white via-sky-100 to-sky-300 text-blue-950",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-950 via-sky-300 to-white pb-20">
      {/* HERO IMAGE SECTION */}
      <section className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[430px] w-full overflow-hidden rounded-none rounded-br-[90px] shadow-2xl shadow-blue-950/30"
        >
          <img
            src={serviceHero}
            alt="Our services"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-black/45 to-white/10" />

          <div className="relative z-10 flex min-h-[430px] flex-col justify-center px-6 md:px-16 lg:px-24">
            <p className="mb-5 w-fit rounded-full border border-white/40 bg-white/15 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
              Our Services
            </p>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Dependable transport solutions for your cargo movement.
            </h1>

            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-100">
              From Howo trucks to tippers and bulk cargo delivery, we help
              customers move goods safely, efficiently, and professionally.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHAT WE DO SECTION */}
      <div className="mt-16 px-6 text-center lg:px-24">
        <h2 className="text-4xl font-semibold text-blue-950">What We Do</h2>
        <p className="mx-auto mt-5 mb-6 max-w-3xl text-lg font-medium leading-8 text-slate-700">
          We provide reliable truck hire, tipper hire, and bulk cargo transport
          services for businesses, farms, mines, construction projects, and
          individual customers.
        </p>
      </div>

      {/* SERVICES CARDS */}
      <section className="bg-transparent px-4 py-14 pb-1 sm:px-6 lg:px-20">
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-start lg:gap-14">
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex w-full max-w-[430px] flex-col items-center ${service.margin}`}
            >
              <div
                className="relative h-[430px] w-full overflow-hidden p-7 shadow-2xl sm:h-[470px]"
                style={{
                  background: service.borderGradient,
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />

                  <div
                    className={`absolute bottom-10 left-8 right-8 z-10 border border-white/20 px-5 py-5 text-center shadow-2xl backdrop-blur-md ${service.descClass}`}
                  >
                    <p className="text-sm font-medium leading-6 sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mt-5 text-center text-2xl font-bold text-blue-950">
                {service.title}
              </h3>

              <div className="mt-2 text-xl font-light leading-none text-slate-500">
                |
              </div>

              <div className="mt-1 text-5xl font-light text-blue-950">
                {service.number}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Services;