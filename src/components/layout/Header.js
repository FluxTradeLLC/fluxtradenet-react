import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import fluxLogo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const Header = () => {
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  // const [hasSession, setHasSession] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   const email = localStorage.getItem("userEmail");
  //   setHasSession(!!email);
  // }, []);

  const handleClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-gray-900 text-white p-4 sm:p-6 md:p-8 z-50 fixed top-0 left-0 right-0 border-b border-gray-700" role="banner">
      <div className="lg:flex lg:items-center lg:justify-between">
        <Link
          to="/"
          className="flex items-center justify-center flex-col md:flex-row lg:flex-shrink-0"
          onClick={handleClick}
          aria-label="FluxTrade home"
        >
          <img src={fluxLogo} alt="Flux Trade Logo" className="h-[75px]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic md:ml-[40px] text-center">
            FluxTrade
          </h1>
        </Link>
        <button
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          className="xl:hidden absolute right-6 top-6 ml-auto mt-2 p-2 rounded-lg border border-gray-700 hover:bg-gray-800"
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
          id="main-navigation"
          className={`${isMenuOpen ? "flex" : "hidden"} xl:flex lg:flex-1 w-full flex-col lg:flex-row gap-2 md:flex-wrap justify-center lg:justify-end items-center space-y-2 md:space-y-0 lg:space-y-0 lg:gap-4 p-6 rounded-lg`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <Link
                to="/"
                className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
                style={{ textDecoration: "none" }}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                <span>Home</span>
              </Link>
            </li>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <Link
                to="/pricing"
                className={`flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 ${prefersReducedMotion ? "" : "animate-soft-gradient"} text-w font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:bg-gradient-to-l`}
                style={{
                  textDecoration: "none",
                  backgroundSize: "200% 200%",
                  animation: prefersReducedMotion ? "none" : "soft-gradient-x 3s ease-in-out infinite",
                }}
                aria-current={location.pathname === "/pricing" ? "page" : undefined}
              >
                <span>Pricing</span>
              </Link>
            </li>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <Link
                to="/backtests/explorer"
                className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
                style={{ textDecoration: "none" }}
                aria-current={location.pathname === "/backtests/explorer" ? "page" : undefined}
              >
                <span>Backtest Explorer</span>
              </Link>
            </li>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <Link
                to="/affiliates"
                className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
                style={{ textDecoration: "none" }}
                aria-current={location.pathname === "/affiliates" ? "page" : undefined}
              >
                <span>Affiliates</span>
              </Link>
            </li>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <Link
                to="/account"
                className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
                style={{ textDecoration: "none" }}
                aria-current={location.pathname === "/account" ? "page" : undefined}
              >
                <span>Account</span>
              </Link>
            </li>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <Link
                to="/support"
                className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
                style={{ textDecoration: "none" }}
                aria-current={location.pathname === "/support" ? "page" : undefined}
              >
                <span>Support</span>
              </Link>
            </li>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <a
                href="https://discord.gg/fluxtrade"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 text-gray-400 hover:text-gray-300 py-2 px-4 transition-colors duration-200 border border-gray-700 rounded-lg p-2"
                style={{ textDecoration: "none" }}
                aria-label="Join FluxTrade Discord community (opens in new tab)"
              >
                <FontAwesomeIcon icon={faDiscord} size="sm" aria-hidden="true" />
                <span>Free Discord</span>
              </a>
            </li>
          </ul>
          <ul className="w-full lg:w-auto max-w-[500px]" onClick={handleClick}>
            <li>
              <a
                href="https://www.shoulditradetoday.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 text-gray-400 hover:text-gray-300  py-2 px-4 transition-colors duration-200 border border-gray-700 rounded-lg p-2"
                style={{ textDecoration: "none" }}
                aria-label="Should I Trade Today? (opens in new tab)"
              >
                <span>Should I Trade Today?</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
