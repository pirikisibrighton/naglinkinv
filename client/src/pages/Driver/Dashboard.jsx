import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../services/api";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/DashboardLayout";

import {
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  DollarSign,
  Loader,
  MapPin,
  Package,
  PackageCheck,
  Scale,
  Truck,
  Upload,
LocateFixed,
  User,
} from "lucide-react";

const DriverDashboard = () => {
  const { user, logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [globalSearch, setGlobalSearch] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [loadingData, setLoadingData] = useState({
    packageNumber: "",
    weight: "",
    loadingNotes: "",
    loadingDocument: null,
  });

  const [offloadingData, setOffloadingData] = useState({
    offloadingDocument: null,
  });

  const fetchOrders = async () => {
    try {
      const response = await API.get("/driver/my-orders");
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    }
  };

  const handleSendCurrentLocation = (orderId) => {
  if (!navigator.geolocation) {
    toast.error("Location is not supported on this device.");
    return;
  }

  toast.loading("Getting current location...", {
    id: "location-update",
  });

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude, accuracy } = position.coords;

await API.post(`/order-locations/${orderId}`, {
  latitude,
  longitude,
  accuracy,
});

        toast.success("Location updated successfully!", {
          id: "location-update",
        });

        fetchOrders();
      } catch (error) {
        console.error("Location update error:", error);

        toast.error(
          error.response?.data?.message || "Error updating location",
          {
            id: "location-update",
          }
        );
      }
    },
    (error) => {
      console.error("Location permission error:", error);

      toast.error("Please allow location access to update your location.", {
        id: "location-update",
      });
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStartLoading = async (orderId) => {
    try {
      const formData = new FormData();

      formData.append("packageNumber", loadingData.packageNumber);
      formData.append("weight", loadingData.weight);
      formData.append("loadingNotes", loadingData.loadingNotes);

      if (loadingData.loadingDocument) {
        formData.append("loadingDocument", loadingData.loadingDocument);
      }

      await API.post(`/driver/${orderId}/start-loading`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Loading details submitted! Waiting for admin approval.");

      setSelectedOrder(null);
      setModalType(null);

      setLoadingData({
        packageNumber: "",
        weight: "",
        loadingNotes: "",
        loadingDocument: null,
      });

      fetchOrders();
    } catch (err) {
      console.error("Error submitting loading details:", err);
      toast.error(
        err.response?.data?.message || "Error submitting loading details"
      );
    }
  };

  const handleUploadOffloading = async (orderId) => {
    try {
      const formData = new FormData();

      if (offloadingData.offloadingDocument) {
        formData.append("offloadingDocument", offloadingData.offloadingDocument);
      }

      await API.post(`/driver/${orderId}/upload-offloading`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Offloading document uploaded! Waiting for admin approval.");

      setSelectedOrder(null);
      setModalType(null);
      setOffloadingData({ offloadingDocument: null });

      fetchOrders();
    } catch (err) {
      console.error("Error uploading document:", err);
      toast.error(err.response?.data?.message || "Error uploading document");
    }
  };

  const handleCompleteTrip = async (orderId) => {
    if (window.confirm("Are you sure you want to mark this trip as complete?")) {
      try {
        await API.post(`/driver/${orderId}/complete-trip`);
        toast.success("Trip completed successfully!");
        fetchOrders();
      } catch (err) {
        console.error("Error completing trip:", err);
        toast.error("Error completing trip");
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-blue-100 text-blue-700",
      loading: "bg-purple-100 text-purple-700",
      in_transit: "bg-indigo-100 text-indigo-700",
      offloading: "bg-orange-100 text-orange-700",
      delivered: "bg-emerald-100 text-emerald-700",
    };

    return colors[status] || "bg-blue-100 text-blue-700";
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pending",
      approved: "Approved",
      loading: "Loading",
      in_transit: "In Transit",
      offloading: "Offloading",
      delivered: "Delivered",
    };

    return labels[status] || "Pending";
  };

  const getFilteredOrders = () => {
    if (!globalSearch) return orders;

    const q = globalSearch.toLowerCase();

    return orders.filter(
      (order) =>
        order.id?.toString().includes(q) ||
        order.customer?.username?.toLowerCase().includes(q) ||
        order.customer?.email?.toLowerCase().includes(q) ||
        order.pickupLocation?.toLowerCase().includes(q) ||
        order.deliveryLocation?.toLowerCase().includes(q) ||
        order.goodsDescription?.toLowerCase().includes(q) ||
        order.status?.toLowerCase().includes(q) ||
        order.truck?.truckName?.toLowerCase().includes(q) ||
        order.truck?.licensePlate?.toLowerCase().includes(q)
    );
  };

  const filteredOrders = getFilteredOrders();

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const upcomingOrders = orders.filter((order) =>
    ["approved", "loading", "in_transit", "offloading"].includes(order.status)
  ).length;

  const latestOrders = [...filteredOrders]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.updatedAt || 0) -
        new Date(a.createdAt || a.updatedAt || 0)
    )
    .slice(0, 5);

  const inputClass =
    "w-full rounded-2xl border-2 border-sky-200 bg-white/90 px-4 py-3 text-blue-950 outline-none transition placeholder:text-slate-500 focus:border-blue-700";

  const labelClass = "mb-2 block font-bold text-blue-950";

  const modalPrimaryButton =
    "flex items-center justify-center gap-2 rounded-lg border border-blue-950 bg-blue-950 px-5 py-2 text-sm font-semibold text-white transition hover:border-blue-500 hover:bg-blue-700";

  const modalCancelButton =
    "flex items-center justify-center gap-2 rounded-lg border border-blue-950 px-5 py-2 text-sm font-semibold text-blue-950 transition hover:border-blue-500 hover:bg-blue-700 hover:text-white";

  return (
    <DashboardLayout
      user={user}
      logout={logout}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      title="Driver Portal"
      globalSearch={globalSearch}
      setGlobalSearch={setGlobalSearch}
      menuItems={[{ key: "orders", label: "My Orders" }]}
    >
      <div className="space-y-8">
        <div className="rounded-md border border-white/20 bg-gradient-to-br from-blue-950 via-sky-800 to-blue-900 p-5 text-white shadow-xl sm:p-6">
          <h2 className="text-3xl font-black sm:text-4xl">
            Welcome back, {user?.username}
          </h2>

          <p className="mt-2 text-sm font-medium text-sky-100 sm:text-base">
            Here is your assigned trips overview and delivery progress.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Total Orders",
              value: totalOrders,
              subtitle: "All assigned orders",
              icon: ClipboardList,
              bgColor: "bg-blue-500/10",
              textColor: "text-blue-300",
            },
            {
              title: "Delivered",
              value: deliveredOrders,
              subtitle: "Completed deliveries",
              icon: PackageCheck,
              bgColor: "bg-emerald-500/10",
              textColor: "text-emerald-300",
            },
            {
              title: "Upcoming Orders",
              value: upcomingOrders,
              subtitle: "Active or pending trips",
              icon: CalendarClock,
              bgColor: "bg-orange-500/10",
              textColor: "text-orange-300",
            },
          ].map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="rounded-md border border-white/20 bg-gradient-to-br from-blue-950 via-sky-800 to-blue-900 text-white shadow-xl transition duration-200 hover:border-white/40"
              >
                <div className="p-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-1 text-sm font-medium text-sky-100">
                        {card.title}
                      </p>

                      <p className="text-3xl font-black text-white sm:text-4xl">
                        {card.value}
                      </p>

                      <p className="mt-1 text-xs font-medium text-sky-200">
                        {card.subtitle}
                      </p>
                    </div>

                    <div className={`rounded-xl p-3 ${card.bgColor}`}>
                      <Icon size={22} className={card.textColor} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-md border border-white/20 bg-gradient-to-br from-blue-950 via-sky-800 to-blue-900 p-6 text-white shadow-xl transition duration-200 hover:border-white/40">
            <h3 className="text-xl font-black text-white">
              Order Status Overview
            </h3>

            <p className="mt-1 text-sm font-medium text-sky-100">
              Your order distribution
            </p>

            <div className="mt-8 flex flex-col items-center">
              {(() => {
                const pending = orders.filter(
                  (o) => o.status === "pending"
                ).length;

                const loading = orders.filter(
                  (o) => o.status === "loading"
                ).length;

                const transit = orders.filter(
                  (o) => o.status === "in_transit"
                ).length;

                const offloading = orders.filter(
                  (o) => o.status === "offloading"
                ).length;

                const completed = orders.filter(
                  (o) => o.status === "delivered"
                ).length;

                const total =
                  pending + loading + transit + offloading + completed || 1;

                const p1 = (pending / total) * 100;
                const p2 = p1 + (loading / total) * 100;
                const p3 = p2 + (transit / total) * 100;
                const p4 = p3 + (offloading / total) * 100;

                return (
                  <div
                    className="relative flex h-52 w-52 items-center justify-center rounded-full sm:h-56 sm:w-56"
                    style={{
                      background: `conic-gradient(
                        #facc15 0% ${p1}%,
                        #a855f7 ${p1}% ${p2}%,
                        #38bdf8 ${p2}% ${p3}%,
                        #f97316 ${p3}% ${p4}%,
                        #22c55e ${p4}% 100%
                      )`,
                    }}
                  >
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-white/20 bg-blue-950 shadow-inner">
                      <p className="text-4xl font-black text-white">{total}</p>
                      <p className="text-xs font-bold uppercase text-sky-200">
                        Total
                      </p>
                    </div>
                  </div>
                );
              })()}

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm font-semibold text-sky-100">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  Pending
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-purple-500" />
                  Loading
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-sky-400" />
                  In Transit
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500" />
                  Offloading
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  Delivered
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-white/20 bg-gradient-to-br from-blue-950 via-sky-800 to-blue-900 p-6 text-white shadow-xl transition duration-200 hover:border-white/40 xl:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Recent Orders</h3>

                <p className="mt-1 text-sm font-medium text-sky-100">
                  Latest 5 assigned orders
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3">
                <Truck className="text-blue-300" size={24} />
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-white/20">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-white/10 text-sky-100">
                  <tr>
                    <th className="px-4 py-4">ORDER</th>
                    <th className="px-4 py-4">CUSTOMER</th>
                    <th className="px-4 py-4">FROM</th>
                    <th className="px-4 py-4">TO</th>
                    <th className="px-4 py-4">STATUS</th>
                    <th className="px-4 py-4">DATE</th>
                    <th className="px-4 py-4">UPDATE LOCATION</th>

                  </tr>
                </thead>

                <tbody>
                  {latestOrders.length > 0 ? (
                    latestOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t border-white/10 text-sky-50 transition hover:bg-white/10"
                      >
                        <td className="px-4 py-4 font-black text-white">
                          #{order.id}
                        </td>

                        <td className="px-4 py-4">
                          {order.customer?.username || "N/A"}
                        </td>

                        <td className="px-4 py-4">
                          {order.pickupLocation || "N/A"}
                        </td>

                        <td className="px-4 py-4">
                          {order.deliveryLocation || "N/A"}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sky-100">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="px-4 py-4">
  {["approved", "loading", "in_transit", "offloading"].includes(
    order.status
  ) ? (
    <button
      type="button"
      onClick={() => handleSendCurrentLocation(order.id)}
      className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-sky-300 bg-sky-400/20 text-sky-200 shadow-lg shadow-sky-400/20 transition hover:scale-110 hover:bg-blue-700 hover:text-white"
      title="Send current location"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-30" />
      <LocateFixed
        size={28}
        className="relative z-10 animate-pulse"
      />
    </button>
  ) : (
    <span className="text-xs font-semibold text-sky-200">
      Not active
    </span>
  )}
</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-8 text-center font-semibold text-sky-100"
                      >
                        No recent orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {activeTab === "orders" && (
          <div className="rounded-md border border-white/20 bg-gradient-to-br from-blue-950 via-sky-800 to-blue-900 p-4 text-white shadow-xl sm:p-6">
            <h2 className="mb-4 text-2xl font-black text-white">
              My Assigned Orders
            </h2>

            {filteredOrders.length === 0 ? (
              <p className="py-8 text-center font-semibold text-sky-100">
                No orders assigned yet.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-md border border-white/20 bg-white/10 p-4 text-white transition hover:bg-white/15"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                          <p className="text-lg font-black text-white">
                            Order #{order.id}
                          </p>

                          <span
                            className={`inline-flex w-fit items-center rounded px-2.5 py-1 text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm text-sky-100 md:grid-cols-2">
                          <p className="flex items-center gap-2">
                            <User size={16} className="text-sky-300" />
                            Customer: {order.customer?.username || "N/A"}
                          </p>

                          <p className="flex items-center gap-2">
                            <MapPin size={16} className="text-sky-300" />
                            Pickup: {order.pickupLocation || "N/A"}
                          </p>

                          <p className="flex items-center gap-2">
                            <MapPin size={16} className="text-sky-300" />
                            Delivery: {order.deliveryLocation || "N/A"}
                          </p>

                          <p className="flex items-center gap-2">
                            <Package size={16} className="text-sky-300" />
                            Goods: {order.goodsDescription || "N/A"}
                          </p>

                          <p className="flex items-center gap-2">
                            <Scale size={16} className="text-sky-300" />
                            Weight: {order.weight || "N/A"} kg
                          </p>

                          {order.price && (
                            <p className="flex items-center gap-2 font-black text-green-300">
                              <DollarSign size={16} />
                              Price: ${order.price}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-left text-sm text-sky-100 lg:text-right">
                        {order.departureTime && (
                          <p className="flex items-center gap-2 lg:justify-end">
                            <Clock size={16} className="text-sky-300" />
                            Departure:{" "}
                            {new Date(order.departureTime).toLocaleString()}
                          </p>
                        )}

                        {order.forecastedArrival && (
                          <p className="flex items-center gap-2 lg:justify-end">
                            <CalendarClock
                              size={16}
                              className="text-sky-300"
                            />
                            ETA:{" "}
                            {new Date(
                              order.forecastedArrival
                            ).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      {order.status === "approved" && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setModalType("loading");
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                        >
                          <Package size={18} />
                          Start Loading
                        </button>
                      )}

                      {order.status === "loading" && !order.loadingApproved && (
                        <div className="flex items-center gap-2 rounded bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                          <Loader size={18} />
                          Loading details submitted. Waiting for admin approval...
                        </div>
                      )}

                      {order.status === "in_transit" && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setModalType("offloading");
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-300 bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700 sm:w-auto"
                        >
                          <Upload size={18} />
                          Upload Offloading Document
                        </button>
                      )}

                      {order.status === "offloading" &&
                        !order.offloadingApproved && (
                          <div className="flex items-center gap-2 rounded bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                            <Loader size={18} />
                            POD uploaded. Waiting for admin approval...
                          </div>
                        )}

                      {order.status === "offloading" &&
                        order.offloadingApproved && (
                          <button
                            onClick={() => handleCompleteTrip(order.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
                          >
                            <CheckCircle2 size={18} />
                            Complete Trip
                          </button>
                        )}

                      {order.status === "delivered" && (
                        <div className="flex items-center gap-2 rounded bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                          <CheckCircle2 size={18} />
                          Order Completed Successfully!
                        </div>
                      )}
                    </div>

                    {order.truck && (
                      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-sm text-sky-100">
                        <Truck size={17} className="text-sky-300" />
                        <span className="font-black text-white">
                          Assigned Truck:
                        </span>
                        {order.truck.truckName} - {order.truck.licensePlate} (
                        {order.truck.capacity})
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {modalType === "loading" && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/75 px-3 py-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-gradient-to-r from-blue-950 via-sky-500 to-blue-800 p-[4px] shadow-2xl">
              <div className="rounded-[24px] bg-gradient-to-r from-slate-100 via-sky-100 to-white p-5 sm:p-6">
                <h2 className="mb-5 text-2xl font-black text-blue-950">
                  Start Loading - Order #{selectedOrder.id}
                </h2>

                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleStartLoading(selectedOrder.id);
                  }}
                >
                  <div>
                    <label className={labelClass}>Package Number</label>
                    <input
                      type="text"
                      value={loadingData.packageNumber}
                      onChange={(e) =>
                        setLoadingData({
                          ...loadingData,
                          packageNumber: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="Enter package number"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Weight (kg)</label>
                    <input
                      type="number"
                      value={loadingData.weight}
                      onChange={(e) =>
                        setLoadingData({
                          ...loadingData,
                          weight: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="Enter weight in kg"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Loading Notes</label>
                    <textarea
                      value={loadingData.loadingNotes}
                      onChange={(e) =>
                        setLoadingData({
                          ...loadingData,
                          loadingNotes: e.target.value,
                        })
                      }
                      className={inputClass}
                      rows="3"
                      placeholder="Describe what items are being loaded"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Upload Loading Document</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            toast.error("File size must be less than 10MB");
                            return;
                          }

                          setLoadingData({
                            ...loadingData,
                            loadingDocument: file,
                          });
                        }
                      }}
                      className={inputClass}
                    />

                    {loadingData.loadingDocument && (
                      <p className="mt-2 text-sm font-semibold text-green-700">
                        ✓ Selected: {loadingData.loadingDocument.name}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-slate-500">
                      Upload loading document or photo. Max 10MB.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-sky-200 pt-5 sm:flex-row sm:justify-end">
                    <button type="submit" className={modalPrimaryButton}>
                      Submit Loading Details
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(null);
                        setModalType(null);
                        setLoadingData({
                          packageNumber: "",
                          weight: "",
                          loadingNotes: "",
                          loadingDocument: null,
                        });
                      }}
                      className={modalCancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {modalType === "offloading" && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/75 px-3 py-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-gradient-to-r from-blue-950 via-sky-500 to-blue-800 p-[4px] shadow-2xl">
              <div className="rounded-[24px] bg-gradient-to-r from-slate-100 via-sky-100 to-white p-5 sm:p-6">
                <h2 className="text-2xl font-black text-blue-950">
                  Upload Offloading Document
                </h2>

                <p className="mb-5 mt-2 text-sm font-medium text-slate-600">
                  Order #{selectedOrder.id} - Proof of Delivery
                </p>

                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUploadOffloading(selectedOrder.id);
                  }}
                >
                  <div>
                    <label className={labelClass}>Upload POD Document</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            toast.error("File size must be less than 10MB");
                            return;
                          }

                          setOffloadingData({ offloadingDocument: file });
                        }
                      }}
                      className={inputClass}
                      required
                    />

                    {offloadingData.offloadingDocument && (
                      <p className="mt-2 text-sm font-semibold text-green-700">
                        ✓ Selected: {offloadingData.offloadingDocument.name}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-slate-500">
                      Upload signed Proof of Delivery document. Photo or PDF, max
                      10MB.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-sky-200 pt-5 sm:flex-row sm:justify-end">
                    <button type="submit" className={modalPrimaryButton}>
                      Upload POD
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(null);
                        setModalType(null);
                        setOffloadingData({ offloadingDocument: null });
                      }}
                      className={modalCancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;