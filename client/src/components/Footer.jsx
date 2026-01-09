import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-20 lg:px-32 w-full">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0">

        {/* Logo + Description */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">Mwanawevhu Nexus</h2>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Transforming spaces with cutting-edge architecture, 
            smart planning, and modern construction solutions
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#Home" className="hover:text-white">Home</a></li>
            <li><a href="#About" className="hover:text-white">About us</a></li>
            <li><a href="#Contact" className="hover:text-white">Contact us</a></li>
            <li><a href="#Privacy" className="hover:text-white">Privacy policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-sm">
          <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
          <p className="text-gray-300 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 py-3 px-4 rounded-l w-full outline-none text-white"
            />
            <button className="bg-blue-600 px-5 rounded-r">Subscribe</button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          Copyright 2025 © Mwanawevhu Nexus. All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
