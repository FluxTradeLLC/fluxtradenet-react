import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import fluxLogo from '../../assets/logo.png';

export const Header = () => {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setHasSession(!!token);
  }, []);

  return (
    <header className="bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <Link to="/" className="flex items-center flex-col md:flex-row">
          <img src={fluxLogo} alt="Flux Trade Logo" className="h-[75px]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic ml-[40px] text-center">FluxTrade</h1>
      </Link>
      <nav className="flex w-full md:w-auto justify-center md:justify-end items-center space-x-8 p-6 rounded-lg md:ml-[100px] md:-mt-[100px]">
        <ul><Link to="/">Home</Link></ul>
        <ul><Link to="/pricing">{hasSession ? "Select a Plan" : "Pricing"}</Link></ul>
        <ul><a href="https://discord.gg/UTcxDRQ26U">Free Discord</a></ul>
        <ul><a href="https://shoulditradetoday.com">Should I Trade Today?</a></ul>
        <ul><Link to="/account">Account</Link></ul>
      </nav>
    </header>
  );
}; 