import { Link, NavLink } from "react-router-dom";
import { Menu, X, UserRound } from "lucide-react";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Fleet", path: "/fleet" },
    { name: "Track Order", path: "/track-order" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/20 bg-gradient-to-r from-white via-sky-300 to-blue-950 shadow-lg shadow-blue-950/20"
    >
      <div className="h-[3px] bg-gradient-to-r from-white via-sky-300 to-blue-900" />

      <nav className="flex w-full items-center justify-between px-0 py-4 pr-4">
        <Link to="/" className="flex items-center">
          <motion.div whileHover={{ scale: 1.08 }} className="flex items-center">
            <img
              src={logo}
              alt="Mwanawevhu Logistics Logo"
              className="h-28 w-auto object-contain md:h-32"
            />
          </motion.div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-[20px] font-semibold transition ${
                  isActive ? "text-white" : "text-blue-950 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login?mode=register"
            className="flex items-center gap-2 rounded-lg border border-white px-5 py-3 text-lg font-medium text-white shadow-sm backdrop-blur transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
          >
            <UserRound size={19} />
            Register
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-white px-6 py-3 text-lg font-semibold text-slate-900 shadow-sm transition hover:bg-blue-700 hover:text-white"
          >
            Login
          </Link>

          <a
            href="https://wa.me/263785917545"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition hover:scale-110 hover:bg-green-600"
          >
            <FaWhatsapp size={23} />
          </a>

          <a
            href="https://www.facebook.com/share/1ChhmnGZEa/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-white shadow-md transition hover:scale-110 hover:bg-blue-800"
          >
            <FaFacebookF size={21} />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="mr-2 rounded-lg bg-white/90 p-2 text-blue-950 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-blue-950 px-4 pb-5 md:hidden"
          >
            <div className="space-y-4 pt-4">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="block font-medium text-slate-200 hover:text-sky-300"
                >
                  {link.name}
                </NavLink>
              ))}

              <Link
                to="/login?mode=register"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-white px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                <UserRound size={18} />
                Register
              </Link>

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-white px-5 py-3 text-center font-semibold text-slate-900 hover:bg-blue-700 hover:text-white"
              >
                Login
              </Link>

              <div className="flex justify-center gap-4 pt-2">
                <a
                  href="https://wa.me/263785917545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white"
                >
                  <FaWhatsapp size={23} />
                </a>

                <a
                  href="https://www.facebook.com/share/1ChhmnGZEa/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-white"
                >
                  <FaFacebookF size={21} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;