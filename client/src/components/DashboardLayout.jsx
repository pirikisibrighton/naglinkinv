import { useState } from "react";
import {
  LayoutDashboard,
  Truck,
  ClipboardList,
  Users,
  Bell,
  LogOut,
  Search,
  Menu,
  FileText,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";

const iconMap = {
  dashboard: LayoutDashboard,
  orders: ClipboardList,
  trucks: Truck,
  drivers: Users,
  quotes: FileText,
};

function DashboardLayout({
  children,
  user,
  logout,
  activeTab,
  setActiveTab,
  menuItems = [],
  title = "Dashboard",
  globalSearch,
  setGlobalSearch,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const searchValue =
    typeof globalSearch === "string" ? globalSearch : localSearch;

  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (typeof setGlobalSearch === "function") {
      setGlobalSearch(value);
    } else {
      setLocalSearch(value);
    }
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 via-sky-300 to-white text-blue-950">
      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-blue-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 transform border-r border-white/20 bg-gradient-to-b from-blue-950 via-sky-700 to-blue-900 shadow-2xl shadow-blue-950/30 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-28 items-center justify-between px-5">
          <a
            href="/"
            className="transition duration-300 hover:scale-105"
            title="Go to Website Home"
          >
            <img
              src={logo}
              alt="Naglink Logo"
              className="h-24 w-auto cursor-pointer object-contain"
            />
          </a>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* SIDEBAR MENU */}
        <nav className="mt-4 space-y-3 px-4">
          {menuItems.map((item) => {
            const Icon = iconMap[item.key] || LayoutDashboard;
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleTabClick(item.key)}
                className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left font-semibold transition ${
                  isActive
                    ? "bg-white text-blue-950 shadow-lg shadow-sky-900/30"
                    : "text-white hover:bg-white/15"
                }`}
              >
                <Icon size={21} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-8 left-0 w-full border-t border-white/20 px-4 pt-6">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-4 rounded-2xl border border-white/20 px-4 py-4 font-semibold text-white transition hover:bg-red-500/25"
          >
            <LogOut size={21} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="min-h-screen lg:ml-72">
        {/* TOPBAR */}
        <header className="sticky top-0 z-20 border-b border-white/30 bg-gradient-to-r from-white via-sky-200 to-blue-950 px-4 py-4 shadow-lg shadow-blue-950/10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* LEFT */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl bg-blue-950 p-3 text-white shadow-md transition hover:bg-blue-800 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <h1 className="text-xl font-black text-blue-950 sm:text-2xl lg:text-3xl">
                {title}
              </h1>
            </div>

            {/* SEARCH */}
            <div className="relative w-full flex-1">
              <Search
                size={20}
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-blue-950/60"
              />

              <input
                type="text"
                placeholder="Search orders, trucks, drivers..."
                value={searchValue}
                onChange={handleSearchChange}
                className="h-12 w-full rounded-2xl border-2 border-sky-200 bg-white/85 px-14 text-blue-950 outline-none backdrop-blur placeholder:text-slate-500 focus:border-blue-700"
              />
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <button className="rounded-full bg-white/80 p-3 text-blue-950 shadow-sm transition hover:bg-blue-700 hover:text-white">
                <Bell size={22} />
              </button>

              <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/80 px-3 py-2 shadow-sm backdrop-blur">
                <div className="min-w-0 text-right">
                  <p className="truncate text-sm font-bold text-blue-950 sm:text-base">
                    {user?.username || "User"}
                  </p>

                  <p className="text-xs font-semibold capitalize text-slate-600">
                    {user?.role || "system user"}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-950 via-sky-600 to-blue-800 font-bold text-white shadow-md">
                  {(user?.username || "U").slice(0, 2).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="px-3 py-6 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;