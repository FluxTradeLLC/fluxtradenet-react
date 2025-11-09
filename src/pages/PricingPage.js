import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export function PricingPage() {
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
      MONTHLY: {
        STANDARD_SINGLE_NT: "price_1Rk96ZDHqntRcM5inO0o24TP",
        STANDARD_SINGLE_TV: "price_1SCOHuDHqntRcM5igLxXPiS0",
        STANDARD_BOTH: "price_1SCOIPDHqntRcM5iITNhbT1z",
        PRO_SINGLE_NT: "price_1Rk971DHqntRcM5i5pndgfLL",
        PRO_SINGLE_TV: "price_1SROS6DHqntRcM5inP7na4xA",
        PRO_BOTH: "price_1SCOIgDHqntRcM5ilbjDXU7y",
        TEST: "price_1RuGDIDHqntRcM5iboesQtD5",
      },
      QUARTERLY: {
        STANDARD_SINGLE_NT: "PLACEHOLDER_QUARTERLY_STANDARD_SINGLE_NT",
        STANDARD_SINGLE_TV: "PLACEHOLDER_QUARTERLY_STANDARD_SINGLE_TV",
        STANDARD_BOTH: "PLACEHOLDER_QUARTERLY_STANDARD_BOTH",
        PRO_SINGLE_NT: "PLACEHOLDER_QUARTERLY_PRO_SINGLE_NT",
        PRO_SINGLE_TV: "PLACEHOLDER_QUARTERLY_PRO_SINGLE_TV",
        PRO_BOTH: "PLACEHOLDER_QUARTERLY_PRO_BOTH",
        TEST: "PLACEHOLDER_QUARTERLY_TEST",
      },
      YEARLY: {
        STANDARD_SINGLE_NT: "PLACEHOLDER_YEARLY_STANDARD_SINGLE_NT",
        STANDARD_SINGLE_TV: "PLACEHOLDER_YEARLY_STANDARD_SINGLE_TV",
        STANDARD_BOTH: "PLACEHOLDER_YEARLY_STANDARD_BOTH",
        PRO_SINGLE_NT: "PLACEHOLDER_YEARLY_PRO_SINGLE_NT",
        PRO_SINGLE_TV: "PLACEHOLDER_YEARLY_PRO_SINGLE_TV",
        PRO_BOTH: "PLACEHOLDER_YEARLY_PRO_BOTH",
        TEST: "PLACEHOLDER_YEARLY_TEST",
      },
    },
    PRODUCTION: {
      MONTHLY: {
        STANDARD_SINGLE_NT: "price_1RkWkiDHqntRcM5i8UrCeTsw",
        STANDARD_SINGLE_TV: "price_1SCOEzDHqntRcM5iSPtrtetG",
        STANDARD_BOTH: "price_1SCOG5DHqntRcM5iouL0zesB",
        PRO_SINGLE_NT: "price_1RkWkcDHqntRcM5i4MakObtw",
        PRO_SINGLE_TV: "price_1SCOFJDHqntRcM5iMcAPakLT",
        PRO_BOTH: "price_1SCOGgDHqntRcM5irQtSptbE",
        TEST: "price_1RuG9KDHqntRcM5iW0OPXS5D",
      },
      QUARTERLY: {
        STANDARD_SINGLE_NT: "PLACEHOLDER_QUARTERLY_STANDARD_SINGLE_NT",
        STANDARD_SINGLE_TV: "PLACEHOLDER_QUARTERLY_STANDARD_SINGLE_TV",
        STANDARD_BOTH: "PLACEHOLDER_QUARTERLY_STANDARD_BOTH",
        PRO_SINGLE_NT: "PLACEHOLDER_QUARTERLY_PRO_SINGLE_NT",
        PRO_SINGLE_TV: "PLACEHOLDER_QUARTERLY_PRO_SINGLE_TV",
        PRO_BOTH: "PLACEHOLDER_QUARTERLY_PRO_BOTH",
        TEST: "PLACEHOLDER_QUARTERLY_TEST",
      },
      YEARLY: {
        STANDARD_SINGLE_NT: "PLACEHOLDER_YEARLY_STANDARD_SINGLE_NT",
        STANDARD_SINGLE_TV: "PLACEHOLDER_YEARLY_STANDARD_SINGLE_TV",
        STANDARD_BOTH: "PLACEHOLDER_YEARLY_STANDARD_BOTH",
        PRO_SINGLE_NT: "PLACEHOLDER_YEARLY_PRO_SINGLE_NT",
        PRO_SINGLE_TV: "PLACEHOLDER_YEARLY_PRO_SINGLE_TV",
        PRO_BOTH: "PLACEHOLDER_YEARLY_PRO_BOTH",
        TEST: "PLACEHOLDER_YEARLY_TEST",
      },
    },
  };

  // Pricing objects for each billing period
  const PRICING = {
    MONTHLY: {
      PRO_SINGLE: 99,
      PRO_BOTH: 119,
      STANDARD_SINGLE: 49,
      STANDARD_BOTH: 69,
    },
    QUARTERLY: {
      PRO_SINGLE: 265, // PLACEHOLDER - fill in quarterly price
      PRO_BOTH: 320, // PLACEHOLDER - fill in quarterly price
      STANDARD_SINGLE: 130, // PLACEHOLDER - fill in quarterly price
      STANDARD_BOTH: 185, // PLACEHOLDER - fill in quarterly price
    },
    YEARLY: {
      PRO_SINGLE: 990, // PLACEHOLDER - fill in yearly price
      PRO_BOTH: 1190, // PLACEHOLDER - fill in yearly price
      STANDARD_SINGLE: 490, // PLACEHOLDER - fill in yearly price
      STANDARD_BOTH: 690, // PLACEHOLDER - fill in yearly price
    },
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
      return (
        <>
          ${monthlyPrice}
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
            ${basePrice.toFixed(2)}
          </span>
          <span className="text-4xl font-extrabold">
            ${actualPrice.toFixed(2)}
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
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => setBillingPeriod("monthly")}
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
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
              billingPeriod === "quarterly"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
              billingPeriod === "yearly"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex gap-6 mt-8 flex-wrap md:flex-nowrap justify-center w-full">
          {/* Pro - Single (choose platform) */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border-2 border-indigo-500 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400">
              Automated Strategies
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Single Platform
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              {formatPriceDisplay(PRICING.MONTHLY.PRO_SINGLE, "PRO_SINGLE")}
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
                      handleCheckout(currentPricingIds.PRO_SINGLE_NT)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on NinjaTrader"
                      : "Subscribe on NinjaTrader"}
                  </button>
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.PRO_SINGLE_TV)
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

          {/* Pro - Both */}
          <div className="w-full max-w-sm relative p-[4px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-indigo-500 bg-[length:300%_300%] animate-gradient-pan transform hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <div className="bg-gray-800 rounded-lg p-6 h-full relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:300%_300%] animate-gradient-pan text-white text-sm font-bold px-4 py-1 rounded-full z-10">
                MOST POPULAR
              </div>
              <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400">
                Automated Strategies
              </h2>
              <h3 className="text-center text-sm text-gray-400 mb-4">
                Both Platforms
              </h3>
              <p className="text-center text-4xl font-extrabold mb-6">
                {formatPriceDisplay(PRICING.MONTHLY.PRO_BOTH, "PRO_BOTH")}
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
                    onClick={() => handleCheckout(currentPricingIds.PRO_BOTH)}
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

        {/* Standard - Single (choose platform) */}
        <div className="flex gap-6 mt-8 flex-wrap md:flex-nowrap justify-center w-full">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-center mb-1">Indicators</h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Single Platform
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              {formatPriceDisplay(
                PRICING.MONTHLY.STANDARD_SINGLE,
                "STANDARD_SINGLE"
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
                      handleCheckout(currentPricingIds.STANDARD_SINGLE_NT)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly"
                      ? "Start 30‑day free trial on NinjaTrader"
                      : "Subscribe on NinjaTrader"}
                  </button>
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.STANDARD_SINGLE_TV)
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
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-center mb-1">Indicators</h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              Both Platforms
            </h3>
            <p className="text-center text-4xl font-extrabold mb-6">
              {formatPriceDisplay(
                PRICING.MONTHLY.STANDARD_BOTH,
                "STANDARD_BOTH"
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
                    handleCheckout(currentPricingIds.STANDARD_BOTH)
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
    </div>
  );
}
