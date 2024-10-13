// Header.js
import React, { useState, useEffect } from 'react';

const Header = ({ appIcon, userName, userStatus }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle scroll and hide icon
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-gray-800 p-2 shadow-md flex items-center justify-between">
      {/* App Icon - Disappears on scroll */}
      {!isScrolled && (
        <img
          src={appIcon}
          alt="app-icon"
          className="w-8 h-8 rounded-full mr-4"
        />
      )}

      {/* User Info */}
      <div>
        <h3 className="text-lg font-semibold">{userName}</h3>
        <p className="text-sm text-gray-400">{userStatus}</p>
      </div>

      {/* Hamburger Menu */}
      <button
        className="text-white lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Menu Items - Shows when hamburger is clicked */}
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } lg:flex lg:items-center lg:space-x-4`}
      >
        <a href="#" className="text-white px-2 py-1 rounded-md hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="text-white px-2 py-1 rounded-md hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="text-white px-2 py-1 rounded-md hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </header>
  );
};

export default Header;
