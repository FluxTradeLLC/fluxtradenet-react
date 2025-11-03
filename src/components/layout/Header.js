import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fluxLogo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faYoutube,
  faTwitch,
  faInstagram,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const Header = () => {
  const [hasSession, setHasSession] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setHasSession(!!email);
  }, []);

  const handleClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="lg:flex lg:items-center lg:justify-between">
        <Link
          to="/"
          className="flex items-center justify-center flex-col md:flex-row lg:flex-shrink-0"
          onClick={handleClick}
        >
          <img src={fluxLogo} alt="Flux Trade Logo" className="h-[75px]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic md:ml-[40px] text-center">
            FluxTrade
          </h1>
        </Link>
        <button
          aria-label="Toggle navigation menu"
          className="lg:hidden absolute right-6 top-6 ml-auto mt-2 p-2 rounded-lg border border-gray-700 hover:bg-gray-800"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          )}
        </button>
        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} lg:flex lg:flex-1 w-full flex-col lg:flex-row gap-2 md:flex-wrap justify-center lg:justify-end items-center space-y-2 md:space-y-0 lg:space-y-0 lg:gap-4 p-6 rounded-lg`}
        >
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <Link
              to="/"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <span>Home</span>
            </Link>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <Link
              to="/pricing"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 animate-soft-gradient text-w font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:bg-gradient-to-l"
              style={{
                textDecoration: "none",
                backgroundSize: "200% 200%",
                animation: "soft-gradient-x 3s ease-in-out infinite",
              }}
            >
              <span>Pricing</span>
            </Link>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <Link
              to="/affiliates"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <span>Affiliates</span>
            </Link>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <a
              href="https://discord.gg/fluxtrade"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faDiscord} size="lg" />
              <span>Free Discord</span>
            </a>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <a
              href="https://www.shoulditradetoday.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <span>Should I Trade Today?</span>
            </a>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <Link
              to="/account"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <span>Account</span>
            </Link>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <a
              href="https://www.youtube.com/@FluxTradeLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" color="red" />
            </a>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <a
              href="https://www.twitch.tv/fluxtradellc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faTwitch} size="lg" color="purple" />
            </a>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <a
              href="https://www.instagram.com/fluxtradellc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" color="black" />
            </a>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <a
              href="https://www.tiktok.com/@bitlionllc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faTiktok} size="lg" color="black" />
            </a>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <a
              href="https://www.facebook.com/profile.php?id=61583361714523"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" color="blue" />
            </a>
          </ul>
        </nav>
      </div>
    </header>
  );
};
