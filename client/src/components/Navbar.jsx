import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  const closeMenu = () => setShowMobileMenu(false);

  const navItems = [
    { name: 'HOME', href: '#Header' },
    { name: 'PROJECTS', href: '#Projects' },
    { name: 'ABOUT', href: '#About' },
    { name: 'TESTIMONIALS', href: '#Testimonials' },
    { name: 'CONTACT', href: '#Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-md rounded-tl-2xl rounded-tr-2xl">
      <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-8 py-6">

        {/* LOGO */}
        <div className="min-w-0 truncate text-white font-oswald font-bold tracking-wide text-lg sm:text-xl md:text-3xl">
          MWANAWEVHU-NEXUS
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <li key={item.name} className="text-white text-lg tracking-wide cursor-pointer hover:opacity-70">
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU ICON */}
        <button
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden text-white text-3xl flex-shrink-0"
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* MOBILE MENU PANEL */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out ${
            showMobileMenu ? 'w-64' : 'w-0'
          } overflow-hidden`}
        >
          {/* CLOSE ICON */}
          <div className="flex justify-end p-6">
            <button onClick={closeMenu} className="text-3xl text-black" aria-label="Close menu">
              ✕
            </button>
          </div>

          {/* MOBILE LINKS */}
          <ul className="flex flex-col gap-6 px-6 text-lg font-medium text-black">
            {navItems.map((item) => (
              <li key={item.name}>
                <a onClick={closeMenu} href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
