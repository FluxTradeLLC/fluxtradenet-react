import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export function PricingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setIsAuthenticated(true);
    }
    try {
      const testModeValue = localStorage.getItem("TEST_MODE");
      setIsTestMode(testModeValue === "true");
    } catch (error) {
      setIsTestMode(false);
    }
  }, []);

  const handleCheckout = async (priceId) => {
    try {
      const response = await api.post("/payment/create-checkout-session", {
        priceId: priceId,
        subscription: true,
        referral: window.promotekit_referral,
      });
      // Redirect to Stripe checkout
      window.location.href = response.data.redirect;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle error, e.g., show a notification to the user
    }
  };

  const PRICING_IDS = {
    LOCAL: {
      STANDARD_SINGLE_NT: "price_1Rk96ZDHqntRcM5inO0o24TP",
      STANDARD_SINGLE_TV: "price_1SCOHuDHqntRcM5igLxXPiS0",
      STANDARD_BOTH: "price_1SCOIPDHqntRcM5iITNhbT1z",
      PRO_SINGLE_NT: "price_1Rk971DHqntRcM5i5pndgfLL",
      PRO_SINGLE_TV: "price_1SCOIADHqntRcM5ilHuIjjTA",
      PRO_BOTH: "price_1SCOIgDHqntRcM5ilbjDXU7y",
      TEST: "price_1RuGDIDHqntRcM5iboesQtD5",
    },
    PRODUCTION: {
      STANDARD_SINGLE_NT: "price_1RkWkiDHqntRcM5i8UrCeTsw",
      STANDARD_SINGLE_TV: "price_1SCOEzDHqntRcM5iSPtrtetG",
      STANDARD_BOTH: "price_1SCOG5DHqntRcM5iouL0zesB",
      PRO_SINGLE_NT: "price_1RkWkcDHqntRcM5i4MakObtw",
      PRO_SINGLE_TV: "price_1SCOFJDHqntRcM5iMcAPakLT",
      PRO_BOTH: "price_1SCOGgDHqntRcM5irQtSptbE",
      TEST: "price_1RuG9KDHqntRcM5iW0OPXS5D",
    },
  };

  const envKey = process.env.REACT_APP_NODE_ENV
    ? process.env.REACT_APP_NODE_ENV.toUpperCase()
    : "LOCAL";
  const testPriceId = PRICING_IDS[envKey]?.TEST;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="text-center mb-12 pt-12">
        <h1 className="text-5xl font-extrabold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-400">
          Unlock the full potential of FluxTrade with our tailored plans. All
          plans offer a 30 day free trial!
        </p>
      </div>
      <div className="flex flex-col items-center">
        {/* Standard - Single (choose platform) */}
        <div className="flex gap-6 flex-wrap md:flex-nowrap justify-center w-full">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-center mb-1">Indicators</h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Single Platform
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              $49<span className="text-lg font-medium text-gray-400">/mo</span>
            </p>
            <ul className="space-y-4 text-gray-300 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Access to all our indicators</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Cancel anytime</span>
              </li>
            </ul>
            {isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    handleCheckout(PRICING_IDS[envKey].STANDARD_SINGLE_NT)
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  NinjaTrader
                </button>
                <button
                  onClick={() =>
                    handleCheckout(PRICING_IDS[envKey].STANDARD_SINGLE_TV)
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  TradingView
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/account")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  NinjaTrader
                </button>
                <button
                  onClick={() => navigate("/account")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  TradingView
                </button>
              </div>
            )}
          </div>

          {/* Standard - Both */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-center mb-1">Indicators</h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Both Platforms
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              $69<span className="text-lg font-medium text-gray-400">/mo</span>
            </p>
            <ul className="space-y-4 text-gray-300 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Access to all our indicators</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>NinjaTrader and TradingView</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Cancel anytime</span>
              </li>
            </ul>
            {isAuthenticated ? (
              <button
                onClick={() =>
                  handleCheckout(PRICING_IDS[envKey].STANDARD_BOTH)
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Go To Checkout
              </button>
            ) : (
              <button
                onClick={() => navigate("/account")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Get Started
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6 mt-8 flex-wrap md:flex-nowrap justify-center w-full">
          {/* Pro - Single (choose platform) */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border-2 border-indigo-500 transform hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-sm font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400">
              Automated Strategies
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Single Platform
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              $99<span className="text-lg font-medium text-gray-400">/mo</span>
            </p>
            <ul className="space-y-4 text-gray-300 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Includes indicators for chosen platform</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Access to all automated strategies</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Direct access to new features</span>
              </li>
            </ul>
            {isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    handleCheckout(PRICING_IDS[envKey].PRO_SINGLE_NT)
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  NinjaTrader
                </button>
                <button
                  onClick={() =>
                    handleCheckout(PRICING_IDS[envKey].PRO_SINGLE_TV)
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  TradingView
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/account")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  NinjaTrader
                </button>
                <button
                  onClick={() => navigate("/account")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  TradingView
                </button>
              </div>
            )}
          </div>

          {/* Pro - Both */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border-2 border-indigo-500 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400">
              Automated Strategies
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Both Platforms
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              $119<span className="text-lg font-medium text-gray-400">/mo</span>
            </p>
            <ul className="space-y-4 text-gray-300 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Includes indicators for both platforms</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>NinjaTrader and TradingView</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Access to all automated strategies</span>
              </li>
            </ul>
            {isAuthenticated ? (
              <button
                onClick={() => handleCheckout(PRICING_IDS[envKey].PRO_BOTH)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Go To Checkout
              </button>
            ) : (
              <button
                onClick={() => navigate("/account")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Test Plan (only when TEST_MODE is truthy and a TEST price exists) */}
      {isTestMode && testPriceId ? (
        <div className="bg-gray-800 self-center m-auto mt-8 rounded-lg p-6 w-full max-w-sm border border-yellow-500 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-center mb-4 text-yellow-400">
            Test
          </h2>
          <p className="text-center text-lg font-medium text-gray-400 mb-6">
            Stripe test price
          </p>
          <ul className="space-y-4 text-gray-300 mb-8">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>For testing checkout flows only</span>
            </li>
          </ul>
          {isAuthenticated ? (
            <button
              onClick={() => handleCheckout(testPriceId)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Use Test Checkout
            </button>
          ) : (
            <button
              onClick={() => navigate("/account")}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Get Started
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
