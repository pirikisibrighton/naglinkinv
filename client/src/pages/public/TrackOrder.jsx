import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  PackageCheck,
  Truck,
  MapPin,
  User,
  Phone,
  Clock3,
  AlertCircle,
} from "lucide-react";

function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const statusOrder = [
    "approved",
    "loading",
    "in_transit",
    "offloading",
    "delivered",
  ];

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pending Approval",
      approved: "Order Approved",
      loading: "Loading",
      in_transit: "In Transit",
      offloading: "Offloading",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };

    return labels[status] || "Pending";
  };

  const getTrackingSteps = (status) => {
    const currentIndex = statusOrder.indexOf(status);

    return [
      { title: "Order Approved", status: currentIndex >= 0 },
      { title: "Truck Assigned", status: currentIndex >= 0 },
      { title: "Loading", status: currentIndex >= 1 },
      { title: "In Transit", status: currentIndex >= 2 },
      { title: "Offloading", status: currentIndex >= 3 },
      { title: "Delivered", status: status === "delivered" },
    ];
  };

  const handleTrackOrder = async (e) => {
    e?.preventDefault();

    const orderNumber = trackingNumber.trim();

    if (!orderNumber) {
      setErrorMessage("Please enter an order number.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setTrackingData(null);

      const response = await fetch(`${API_BASE_URL}/orders/track/${orderNumber}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order not found.");
      }

      setTrackingData(data.tracking);
    } catch (error) {
      console.error("Tracking error:", error);
      setErrorMessage(
        error.message || "Order not found. Please check the order number."
      );
    } finally {
      setLoading(false);
    }
  };

  const trackingSteps = getTrackingSteps(trackingData?.status);

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-r from-blue-950 via-sky-300 to-white pb-16">
      <section className="relative overflow-hidden rounded-none rounded-br-[50px] sm:rounded-br-[90px]">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-950/90 via-black/45 to-white/10" />
        <div className="h-[320px] bg-[url('/src/assets/images/hero/DSC05274.jpg')] bg-cover bg-center sm:h-[380px]" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="px-4 sm:px-6 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-4 w-fit rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur sm:text-sm">
                Order Tracking
              </p>

              <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-6xl">
                Track your cargo delivery in real time.
              </h1>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-100 sm:text-lg md:leading-8">
                Monitor your order status from approval, loading, transit,
                offloading, and final delivery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-3 pt-10 sm:px-6 md:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl rounded-[24px] bg-gradient-to-r from-blue-950 via-sky-500 to-blue-800 p-[5px] shadow-2xl sm:rounded-[35px] sm:p-[6px]"
        >
          <div className="rounded-[20px] bg-gradient-to-r from-slate-100 via-sky-100 to-white p-4 sm:rounded-[28px] sm:p-6">
            <h2 className="mb-5 text-2xl font-bold text-blue-950 sm:text-3xl">
              Enter Order Number
            </h2>

            <form onSubmit={handleTrackOrder} className="flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder="e.g 1 or 25"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="h-14 w-full rounded-2xl border-[3px] border-sky-200 bg-white/80 px-4 text-base outline-none backdrop-blur placeholder:text-slate-500 focus:border-blue-700 sm:px-5 sm:text-lg"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-sky-200 bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800 px-6 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:px-8 sm:text-lg"
              >
                <Search size={22} />
                {loading ? "Tracking..." : "Track Order"}
              </button>
            </form>

            {errorMessage && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                <AlertCircle size={18} />
                {errorMessage}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {trackingData && (
        <section className="px-3 pt-10 sm:px-6 md:px-10 lg:px-20">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[24px] bg-gradient-to-r from-blue-950 via-sky-500 to-blue-800 p-[5px] shadow-2xl sm:rounded-[35px] sm:p-[6px] lg:col-span-2"
            >
              <div className="h-full rounded-[20px] bg-gradient-to-r from-slate-100 via-sky-100 to-white p-4 sm:rounded-[28px] sm:p-7">
                <div className="flex items-start gap-3 sm:items-center">
                  <PackageCheck
                    className="mt-1 shrink-0 text-blue-950 sm:mt-0"
                    size={34}
                  />

                  <div>
                    <h2 className="break-all text-2xl font-bold text-blue-950 sm:text-3xl">
                      Order #{trackingData.id}
                    </h2>

                    <p className="text-sm text-slate-700 sm:text-base">
                      Current Status:{" "}
                      <span className="font-semibold text-green-700">
                        {getStatusLabel(trackingData.status)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-7 sm:mt-10 sm:space-y-8">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex gap-4 sm:gap-5">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-5 w-5 shrink-0 rounded-full sm:h-6 sm:w-6 ${
                            step.status
                              ? "bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800"
                              : "bg-slate-300"
                          }`}
                        />

                        {index !== trackingSteps.length - 1 && (
                          <div
                            className={`w-[3px] flex-1 ${
                              step.status ? "bg-blue-700" : "bg-slate-300"
                            }`}
                          />
                        )}
                      </div>

                      <div className="-mt-1 min-w-0">
                        <h3 className="text-lg font-semibold text-blue-950 sm:text-xl">
                          {step.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-700 sm:text-base">
                          {step.status
                            ? "Completed successfully"
                            : "Pending update"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[24px] bg-gradient-to-r from-purple-900 via-blue-800 to-sky-500 p-[5px] shadow-2xl sm:rounded-[35px] sm:p-[6px]"
            >
              <div className="h-full rounded-[20px] bg-gradient-to-r from-slate-100 via-sky-100 to-white p-4 sm:rounded-[28px] sm:p-7">
                <h2 className="mb-7 text-2xl font-bold text-blue-950 sm:mb-8 sm:text-3xl">
                  Delivery Info
                </h2>

                <div className="space-y-6 sm:space-y-7">
                  {[
                    [
                      "Truck",
                      trackingData.truck
                        ? `${trackingData.truck.truckName} - ${trackingData.truck.licensePlate}`
                        : "Not assigned yet",
                      Truck,
                    ],
                    [
                      "Driver",
                      trackingData.driver?.username || "Not assigned yet",
                      User,
                    ],
                    [
                      "Driver Contact",
                      trackingData.driver?.phone || "Not available",
                      Phone,
                    ],
                    [
                      "Destination",
                      trackingData.deliveryLocation || "Not available",
                      MapPin,
                    ],
                    [
                      "Estimated Arrival",
                      trackingData.forecastedArrival
                        ? new Date(trackingData.forecastedArrival).toLocaleString()
                        : "Not available",
                      Clock3,
                    ],
                  ].map(([title, value, Icon]) => (
                    <div key={title} className="flex items-start gap-4">
                      <Icon className="mt-1 shrink-0 text-blue-950" />

                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-blue-950 sm:text-lg">
                          {title}
                        </h3>

                        <p className="break-words text-sm text-slate-700 sm:text-base">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}

export default TrackOrder;