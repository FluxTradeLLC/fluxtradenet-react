import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fluxLogo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export const Header = () => {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setHasSession(!!email);
  }, []);

  return (
    <header className="bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <Link to="/" className="flex items-center flex-col md:flex-row">
          <img src={fluxLogo} alt="Flux Trade Logo" className="h-[75px]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic ml-[40px] text-center">FluxTrade</h1>
      </Link>
      <nav className="flex w-full flex-wrap md:w-auto gap-2 justify-center md:justify-end items-center space-x-8 p-6 rounded-lg md:ml-[300px] md:-mt-[100px]">
        <ul>
          <Link
            to="/"
            className="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
            style={{ textDecoration: 'none' }}
          >
            <span>Home</span>
          </Link>
        </ul>
        <ul>
          <Link
            to="/pricing"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-400 via-pink-300 to-purple-400 animate-soft-gradient text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md"
            style={{
              textDecoration: 'none',
              backgroundSize: '200% 200%',
              animation: 'soft-gradient-x 6s ease-in-out infinite',
            }}
          >
            <span>{hasSession ? "Select a Plan" : "Pricing"}</span>
          </Link>
        </ul>
        <ul>
          <a
            href="https://discord.gg/UTcxDRQ26U"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
            style={{ textDecoration: 'none' }}
          >
            <FontAwesomeIcon icon={faDiscord} size="lg" />
            <span>Free Discord</span>
          </a>
        </ul>
        <ul>
          <a
            href="https://shoulditradetoday.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
            style={{ textDecoration: 'none' }}
          >
            <span>Should I Trade Today?</span>
          </a>
        </ul>
        <ul>
          <Link
            to="/account"
            className="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
            style={{ textDecoration: 'none' }}
          >
            <span>Account</span>
          </Link>
        </ul>
      </nav>
    </header>
  );
}; 