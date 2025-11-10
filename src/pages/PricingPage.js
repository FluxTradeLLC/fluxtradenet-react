import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { PRICING, PRICING_IDS } from "../constants";
import api from "../api/axios";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function PricingPage() {
  const prefersReducedMotion = useReducedMotion();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly', 'quarterly', 'yearly'
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
        billingPeriod,
      });
      // Redirect to Stripe checkout
      window.location.href = response.data.redirect;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Check if it's a 401 Unauthorized error
      if (error.response?.status === 401) {
        toast.error(
          "Your session has expired. Please sign in again to continue."
        );
        localStorage.removeItem("userEmail");
        navigate("/account");
      } else {
        // Handle other errors, e.g., show a notification to the user
        toast.error(
          "An error occurred while creating your checkout session. Please try again."
        );
      }
    }
  };

  const envKey = process.env.REACT_APP_NODE_ENV
    ? process.env.REACT_APP_NODE_ENV.toUpperCase()
    : "LOCAL";

  // Helper function to get current pricing IDs based on billing period
  const getCurrentPricingIds = () => {
    return PRICING_IDS[envKey]?.[billingPeriod.toUpperCase()] || {};
  };

  const currentPricingIds = getCurrentPricingIds();
  const testPriceId = currentPricingIds?.TEST;

  // Helper function to get billing period label
  const getBillingPeriodLabel = () => {
    switch (billingPeriod) {
      case "monthly":
        return "/mo";
      case "quarterly":
        return "/qtr";
      case "yearly":
        return "/yr";
      default:
        return "/mo";
    }
  };

  // Helper function to get price for a plan and billing period
  const getPriceForPlan = (planKey, monthlyPrice) => {
    if (billingPeriod === "monthly") {
      return monthlyPrice;
    }

    const periodKey = billingPeriod.toUpperCase();
    const setPrice = PRICING[periodKey]?.[planKey];

    // If price is set in PRICING object (not 0), use it; otherwise calculate
    if (setPrice && setPrice > 0) {
      return setPrice;
    }

    // Calculate discounted price if not set
    const multiplier = billingPeriod === "quarterly" ? 3 : 12;
    const discount = billingPeriod === "quarterly" ? 0.1 : 0.17;
    return monthlyPrice * multiplier * (1 - discount);
  };

  // Helper function to format price display
  const formatPriceDisplay = (monthlyPrice, planKey) => {
    if (billingPeriod === "monthly") {
      // Format monthly price with commas (handles both integers and decimals)
      const formattedPrice = Number.isInteger(monthlyPrice)
        ? monthlyPrice.toLocaleString()
        : monthlyPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return (
        <>
          ${formattedPrice}
          <span className="text-lg font-medium text-gray-400">
            {getBillingPeriodLabel()}
          </span>
        </>
      );
    }

    const multiplier = billingPeriod === "quarterly" ? 3 : 12;
    const basePrice = monthlyPrice * multiplier;

    // Get the actual price (from PRICING object or calculated)
    const actualPrice = getPriceForPlan(planKey, monthlyPrice);

    // Calculate actual discount percentage
    const discountPercent = ((basePrice - actualPrice) / basePrice) * 100;

    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-500 line-through">
            ${basePrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span className="text-4xl font-extrabold">
            ${actualPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span className="text-lg font-medium text-gray-400">
            {getBillingPeriodLabel()}
          </span>
        </div>
        <span className="text-sm font-semibold text-green-400 mt-1">
          Save {discountPercent.toFixed(0)}%
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="text-center pt-12 pb-6">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-400">
          Unlock the full potential of FluxTrade with our tailored plans.{" "}
          <span className="font-semibold text-indigo-400">
            Monthly plans include a 30-day free trial!
          </span>
        </p>
      </div>

      {/* Billing Period Tabs */}
      <div
        className="flex justify-center mb-8"
        role="tablist"
        aria-label="Billing period selection"
      >
        <div className="inline-flex bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => setBillingPeriod("monthly")}
            role="tab"
            aria-selected={billingPeriod === "monthly"}
            aria-controls="monthly-pricing"
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
              billingPeriod === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("quarterly")}
            role="tab"
            aria-selected={billingPeriod === "quarterly"}
            aria-controls="quarterly-pricing"
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 flex items-center gap-2 ${
              billingPeriod === "quarterly"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Quarterly
            <span
              className={`bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
              aria-label="Save 10 percent"
            >
              Save 10%
            </span>
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            role="tab"
            aria-selected={billingPeriod === "yearly"}
            aria-controls="yearly-pricing"
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 flex items-center gap-2 ${
              billingPeriod === "yearly"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
            <span
              className={`bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
              aria-label="Save 17 percent"
            >
              Save 17%
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex gap-6 mt-8 flex-wrap md:flex-nowrap justify-center w-full">
          {/* Pro - Single (choose platform) */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border-2 border-indigo-500 transform hover:scale-105 transition-transform duration-300 relative overflow-visible">
            <div className="absolute top-2 right-2 z-10">
              <span className="inline-block px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30 whitespace-nowrap">
                Automated Strategies
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400 pt-1 mt-6">
              Automated Strategies
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Single Platform
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              {formatPriceDisplay(
                PRICING.MONTHLY.STRATEGIES_SINGLE,
                "STRATEGIES_SINGLE"
              )}
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
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.STRATEGIES_NT_ONLY)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    aria-label={
                      billingPeriod === "monthly"
                        ? "Start 30 day free trial on NinjaTrader"
                        : "Subscribe on NinjaTrader"
                    }
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on NinjaTrader"
                      : "Subscribe on NinjaTrader"}
                  </button>
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.STRATEGIES_TV_ONLY)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    aria-label={
                      billingPeriod === "monthly"
                        ? "Start 30 day free trial on TradingView"
                        : "Subscribe on TradingView"
                    }
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on TradingView"
                      : "Subscribe on TradingView"}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  No commitment. Cancel anytime.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on NinjaTrader"
                      : "Subscribe on NinjaTrader"}
                  </button>
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on TradingView"
                      : "Subscribe on TradingView"}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  No commitment. Cancel anytime.
                </p>
              </div>
            )}
          </div>

          {/* Pro - Both */}
          <div
            className={`w-full max-w-sm relative p-[4px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:300%_300%] ${prefersReducedMotion ? "" : "animate-gradient-pan"} transform hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)]`}
          >
            <div className="bg-gray-800 rounded-lg p-6 h-full relative overflow-visible">
              <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:300%_300%] ${prefersReducedMotion ? "" : "animate-gradient-pan"} text-white text-sm font-bold px-4 py-1 rounded-full z-10`}
              >
                MOST POPULAR
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
                <span className="inline-block px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30 whitespace-nowrap">
                  Automated Strategies
                </span>
                <span className="inline-block px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/30 whitespace-nowrap">
                  Both Platforms
                </span>
                <span className="inline-block px-2.5 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold border border-purple-500/30 whitespace-nowrap">
                  Priority Updates
                </span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400">
                Automated Strategies
              </h2>
              <h3 className="text-center text-sm text-gray-400 mb-4">
                Both Platforms
              </h3>
              <p className="text-center text-4xl font-extrabold mb-6">
                {formatPriceDisplay(
                  PRICING.MONTHLY.STRATEGIES_NT_AND_TV,
                  "STRATEGIES_NT_AND_TV"
                )}
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
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.STRATEGIES_NT_AND_TV)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                    aria-label={
                      billingPeriod === "monthly"
                        ? "Start 30 day free trial for both platforms"
                        : "Subscribe now for both platforms"
                    }
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial"
                      : "Subscribe Now"}
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    No commitment. Cancel anytime.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial"
                      : "Subscribe Now"}
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    No commitment. Cancel anytime.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Standard - Single (choose platform) */}
        <div className="flex gap-6 mt-8 flex-wrap md:flex-nowrap justify-center w-full">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300 relative">
            <h2 className="text-2xl font-bold text-center mb-1">Indicators</h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Single Platform
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              {formatPriceDisplay(
                PRICING.MONTHLY.INDICATORS_SINGLE,
                "INDICATORS_SINGLE"
              )}
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
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.INDICATORS_NT_ONLY)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on NinjaTrader"
                      : "Subscribe on NinjaTrader"}
                  </button>
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.INDICATORS_TV_ONLY)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on TradingView"
                      : "Subscribe on TradingView"}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  No commitment. Cancel anytime.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on NinjaTrader"
                      : "Subscribe on NinjaTrader"}
                  </button>
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on TradingView"
                      : "Subscribe on TradingView"}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  No commitment. Cancel anytime.
                </p>
              </div>
            )}
          </div>

          {/* Standard - Both */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300 relative overflow-visible">
            <div className="absolute top-2 right-2 z-10">
              <span className="inline-block px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/30 whitespace-nowrap">
                Both Platforms
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-1 pt-1 mt-4">
              Indicators
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Both Platforms
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              {formatPriceDisplay(
                PRICING.MONTHLY.INDICATORS_NT_AND_TV,
                "INDICATORS_NT_AND_TV"
              )}
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
              <div className="space-y-3">
                <button
                  onClick={() =>
                    handleCheckout(currentPricingIds.INDICATORS_NT_AND_TV)
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  {billingPeriod === "monthly"
                    ? "Start 30‑day free trial"
                    : "Subscribe Now"}
                </button>
                <p className="text-center text-sm text-gray-400">
                  No commitment. Cancel anytime.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/account")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  {billingPeriod === "monthly"
                    ? "Start 30‑day free trial"
                    : "Subscribe Now"}
                </button>
                <p className="text-center text-sm text-gray-400">
                  No commitment. Cancel anytime.
                </p>
              </div>
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
      {/* Features Comparison Table */}
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Compare Plans & Features
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="text-left p-4 font-semibold">Features</th>
                <th className="text-center p-4 font-semibold">
                  Indicators
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    Single Platform
                  </span>
                </th>
                <th className="text-center p-4 font-semibold">
                  Indicators
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    Both Platforms
                  </span>
                </th>
                <th className="text-center p-4 font-semibold border-l-2 border-indigo-500">
                  Automated Strategies
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    Single Platform
                  </span>
                </th>
                <th className="text-center p-4 font-semibold bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-l-2 border-indigo-500">
                  Automated Strategies
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    Both Platforms
                  </span>
                  <br />
                  <span className="text-xs font-bold text-indigo-400 mt-1 block">
                    MOST POPULAR
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">Access to all indicators</td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 border-l-2 border-indigo-500">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">Platform access</td>
                <td className="text-center p-4 text-gray-400">Single</td>
                <td className="text-center p-4">
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
                    Both Platforms
                  </span>
                </td>
                <td className="text-center p-4 text-gray-400 border-l-2 border-indigo-500">
                  Single
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
                    Both Platforms
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">
                  Access to automated strategies
                </td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-gray-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-gray-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 border-l-2 border-indigo-500">
                  <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    Automated Strategies
                  </span>
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    Automated Strategies
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">24/7 customer support</td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 border-l-2 border-indigo-500">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">
                  Direct access to new features
                </td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 border-l-2 border-indigo-500">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <svg
                    className="w-6 h-6 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Priority updates</td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-gray-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </td>
                <td className="text-center p-4">
                  <svg
                    className="w-6 h-6 text-gray-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 border-l-2 border-indigo-500">
                  <svg
                    className="w-6 h-6 text-gray-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                    Priority Updates
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
