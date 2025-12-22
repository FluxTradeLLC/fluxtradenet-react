import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { PRICING, PRICING_IDS } from "../constants";
import api from "../api/axios";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { SEO } from "../components/SEO";

// Currency conversion rates (USD as base)
const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
};

// Currency symbols
const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "CHF ",
  CNY: "¥",
};

// Helper function to format number with commas
const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export function PricingPage() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [hasExistingSubscription, setHasExistingSubscription] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly', 'quarterly', 'yearly'
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setIsAuthenticated(true);
      // Check if user has an existing subscription
      const checkSubscriptionExists = async () => {
        try {
          const response = await api.get(`/payment/subscription-exists`, {
            params: { email },
          });
          setHasExistingSubscription(response.data.exists === true);
        } catch (error) {
          console.error("Error checking subscription existence:", error);
          // Default to false if there's an error
          setHasExistingSubscription(false);
        }
      };
      checkSubscriptionExists();
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
        toast.error(t("pricing.errors.sessionExpired"));
        localStorage.removeItem("userEmail");
        navigate("/account");
      } else {
        // Handle other errors, e.g., show a notification to the user
        toast.error(t("pricing.errors.checkoutError"));
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
        return t("pricing.billingPeriods.monthly");
      case "quarterly":
        return t("pricing.billingPeriods.quarterly");
      case "yearly":
        return t("pricing.billingPeriods.yearly");
      default:
        return t("pricing.billingPeriods.monthly");
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

  // Helper function to convert and format currency
  const formatCurrency = (usdAmount, showUsdInParentheses = false) => {
    if (usdAmount === null || usdAmount === undefined || isNaN(usdAmount))
      return "0";
    const converted = usdAmount * CURRENCY_RATES[selectedCurrency];
    const rounded = Math.round(converted);
    const formatted = formatNumber(rounded);
    const symbol = CURRENCY_SYMBOLS[selectedCurrency];

    if (showUsdInParentheses && selectedCurrency !== "USD") {
      const usdFormatted = formatNumber(Math.round(usdAmount));
      return (
        <>
          {symbol}
          {formatted}
          <span className="text-sm text-gray-400 ml-1">(${usdFormatted})</span>
        </>
      );
    }

    return `${symbol}${formatted}`;
  };

  // Helper function to format price display
  const formatPriceDisplay = (monthlyPrice, planKey) => {
    if (billingPeriod === "monthly") {
      // Round to whole dollars and format with commas
      const roundedPrice = Math.round(monthlyPrice);
      return (
        <>
          {formatCurrency(roundedPrice, true)}
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

    // Round to whole dollars
    const roundedBasePrice = Math.round(basePrice);
    const roundedActualPrice = Math.round(actualPrice);

    // Calculate actual discount percentage
    const discountPercent = ((basePrice - actualPrice) / basePrice) * 100;

    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-500 line-through">
            {formatCurrency(roundedBasePrice)}
          </span>
          <span className="text-4xl font-extrabold">
            {formatCurrency(roundedActualPrice, true)}
          </span>
          <span className="text-lg font-medium text-gray-400">
            {getBillingPeriodLabel()}
          </span>
        </div>
        <span className="text-sm font-semibold text-green-400 mt-1">
          {t("pricing.save")} {discountPercent.toFixed(0)}%
        </span>
      </div>
    );
  };

  // Generate product schemas for GEO optimization
  const getProductSchemas = () => {
    return [
      {
        name: t("pricing.products.strategiesSingle.name"),
        description: t("pricing.products.strategiesSingle.description"),
        price: getPriceForPlan(
          "STRATEGIES_SINGLE",
          PRICING.MONTHLY.STRATEGIES_SINGLE
        ),
        currency: "USD",
        category: t("pricing.products.category"),
        platform: t("pricing.products.platforms.single"),
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        name: t("pricing.products.strategiesBoth.name"),
        description: t("pricing.products.strategiesBoth.description"),
        price: getPriceForPlan(
          "STRATEGIES_NT_AND_TV",
          PRICING.MONTHLY.STRATEGIES_NT_AND_TV
        ),
        currency: "USD",
        category: t("pricing.products.category"),
        platform: t("pricing.products.platforms.both"),
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        name: t("pricing.products.indicatorsSingle.name"),
        description: t("pricing.products.indicatorsSingle.description"),
        price: getPriceForPlan(
          "INDICATORS_SINGLE",
          PRICING.MONTHLY.INDICATORS_SINGLE
        ),
        currency: "USD",
        category: t("pricing.products.category"),
        platform: t("pricing.products.platforms.single"),
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        name: t("pricing.products.indicatorsBoth.name"),
        description: t("pricing.products.indicatorsBoth.description"),
        price: getPriceForPlan(
          "INDICATORS_NT_AND_TV",
          PRICING.MONTHLY.INDICATORS_NT_AND_TV
        ),
        currency: "USD",
        category: t("pricing.products.category"),
        platform: t("pricing.products.platforms.both"),
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
    ];
  };

  // Breadcrumbs for GEO optimization
  const breadcrumbs = [
    { name: t("header.home"), url: "/" },
    { name: t("header.pricing"), url: "/pricing" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-full">
      <SEO
        title={t("pricing.seo.title")}
        description={t("pricing.seo.description")}
        keywords={t("pricing.seo.keywords")}
        canonical="/pricing"
        products={getProductSchemas()}
        breadcrumbs={breadcrumbs}
      />
      <div className="text-center pt-12 pb-6">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          {t("pricing.title")}
        </h1>
        <p className="text-lg text-gray-400">
          {t("pricing.subtitle")}{" "}
          {!hasExistingSubscription && (
            <span className="font-semibold text-indigo-400">
              {t("pricing.freeTrial")}
            </span>
          )}
        </p>
      </div>

      {/* Billing Period Tabs and Currency Selector */}
      <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
        <div
          className="flex"
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
              {t("pricing.billingPeriods.monthlyLabel")}
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
              {t("pricing.billingPeriods.quarterlyLabel")}
              <span
                className={`bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
                aria-label={t("pricing.save10Percent")}
              >
                {t("pricing.save10")}
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
              {t("pricing.billingPeriods.yearlyLabel")}
              <span
                className={`bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
                aria-label={t("pricing.save17Percent")}
              >
                {t("pricing.save17")}
              </span>
            </button>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="rounded-lg p-4">
          {/* <label className="block text-sm font-medium mb-2 text-center">
            Currency
          </label> */}
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            {Object.keys(CURRENCY_RATES).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex gap-6 mt-2 flex-wrap md:flex-nowrap justify-center w-full">
          {/* Strategies - Single (choose platform) */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border-2 border-indigo-500 transform hover:scale-105 transition-transform duration-300 relative overflow-visible">
            <div className="absolute top-2 right-2 z-10">
              <span className="inline-block px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30 whitespace-nowrap">
                {t("pricing.plans.strategiesSingle.badge")}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400 pt-1 mt-6">
              {t("pricing.plans.strategiesSingle.title")}
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              {t("pricing.plans.strategiesSingle.subtitle")}
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
                <span>{t("pricing.plans.strategiesSingle.features.includesIndicators")}</span>
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
                <span>{t("pricing.plans.strategiesSingle.features.allStrategies")}</span>
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
                <span>{t("pricing.plans.strategiesSingle.features.newFeatures")}</span>
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
                      billingPeriod === "monthly" && !hasExistingSubscription
                        ? t("pricing.buttons.startTrialNinjaTrader")
                        : t("pricing.buttons.subscribeNinjaTrader")
                    }
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrialNinjaTrader")
                      : t("pricing.buttons.subscribeNinjaTrader")}
                  </button>
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.STRATEGIES_TV_ONLY)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    aria-label={
                      billingPeriod === "monthly" && !hasExistingSubscription
                        ? t("pricing.buttons.startTrialTradingView")
                        : t("pricing.buttons.subscribeTradingView")
                    }
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrialTradingView")
                      : t("pricing.buttons.subscribeTradingView")}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  {t("pricing.noCommitment")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? "Start 30‑day free trial on NinjaTrader"
                      : "Subscribe on NinjaTrader"}
                  </button>
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
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

          {/* Strategies - Both */}
          <div
            className={`w-full max-w-sm relative p-[4px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:300%_300%] ${prefersReducedMotion ? "" : "animate-gradient-pan"} transform hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)]`}
          >
            <div className="bg-gray-800 rounded-lg p-6 h-full relative overflow-visible">
              <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:300%_300%] ${prefersReducedMotion ? "" : "animate-gradient-pan"} text-white text-sm font-bold px-4 py-1 rounded-full z-10`}
              >
                {t("pricing.plans.strategiesBoth.mostPopular")}
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
                <span className="inline-block px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30 whitespace-nowrap">
                  {t("pricing.plans.strategiesBoth.badgeStrategies")}
                </span>
                <span className="inline-block px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/30 whitespace-nowrap">
                  {t("pricing.plans.strategiesBoth.badgeBothPlatforms")}
                </span>
                <span className="inline-block px-2.5 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold border border-purple-500/30 whitespace-nowrap">
                  {t("pricing.plans.strategiesBoth.badgePriority")}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-1 text-indigo-400">
                {t("pricing.plans.strategiesBoth.title")}
              </h2>
              <h3 className="text-center text-sm text-gray-400 mb-4">
                {t("pricing.plans.strategiesBoth.subtitle")}
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
                  <span>{t("pricing.plans.strategiesBoth.features.includesIndicators")}</span>
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
                  <span>{t("pricing.plans.strategiesBoth.features.platforms")}</span>
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
                  <span>{t("pricing.plans.strategiesBoth.features.allStrategies")}</span>
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
                      billingPeriod === "monthly" && !hasExistingSubscription
                        ? t("pricing.buttons.startTrialBoth")
                        : t("pricing.buttons.subscribeNow")
                    }
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrial")
                      : t("pricing.buttons.subscribeNow")}
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    {t("pricing.noCommitment")}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrial")
                      : t("pricing.buttons.subscribeNow")}
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    {t("pricing.noCommitment")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Indicators - Single (choose platform) */}
        <div className="flex gap-6 mt-8 flex-wrap md:flex-nowrap justify-center w-full">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300 relative">
            <h2 className="text-2xl font-bold text-center mb-1">{t("pricing.plans.indicatorsSingle.title")}</h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              {t("pricing.plans.indicatorsSingle.subtitle")}
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
                <span>{t("pricing.plans.indicatorsSingle.features.allIndicators")}</span>
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
                <span>{t("pricing.plans.indicatorsSingle.features.support")}</span>
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
                <span>{t("pricing.plans.indicatorsSingle.features.cancelAnytime")}</span>
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
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrialNinjaTrader")
                      : t("pricing.buttons.subscribeNinjaTrader")}
                  </button>
                  <button
                    onClick={() =>
                      handleCheckout(currentPricingIds.INDICATORS_TV_ONLY)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrialTradingView")
                      : t("pricing.buttons.subscribeTradingView")}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  {t("pricing.noCommitment")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrialNinjaTrader")
                      : t("pricing.buttons.subscribeNinjaTrader")}
                  </button>
                  <button
                    onClick={() => navigate("/account")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {billingPeriod === "monthly" && !hasExistingSubscription
                      ? t("pricing.buttons.startTrialTradingView")
                      : t("pricing.buttons.subscribeTradingView")}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  {t("pricing.noCommitment")}
                </p>
              </div>
            )}
          </div>

          {/* Indicators - Both */}
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm border border-gray-700 transform hover:scale-105 transition-transform duration-300 relative overflow-visible">
            <div className="absolute top-2 right-2 z-10">
              <span className="inline-block px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/30 whitespace-nowrap">
                {t("pricing.plans.indicatorsBoth.badge")}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-1 pt-1 mt-4">
              {t("pricing.plans.indicatorsBoth.title")}
            </h2>
            <h3 className="text-center text-sm text-gray-400 mb-4">
              {t("pricing.plans.indicatorsBoth.subtitle")}
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
                <span>{t("pricing.plans.indicatorsBoth.features.allIndicators")}</span>
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
                <span>{t("pricing.plans.indicatorsBoth.features.platforms")}</span>
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
                <span>{t("pricing.plans.indicatorsBoth.features.cancelAnytime")}</span>
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
                  {billingPeriod === "monthly" && !hasExistingSubscription
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
                  {billingPeriod === "monthly" && !hasExistingSubscription
                    ? t("pricing.buttons.startTrial")
                    : t("pricing.buttons.subscribeNow")}
                </button>
                <p className="text-center text-sm text-gray-400">
                  {t("pricing.noCommitment")}
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
            {t("pricing.test.title")}
          </h2>
          <p className="text-center text-lg font-medium text-gray-400 mb-6">
            {t("pricing.test.subtitle")}
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
              <span>{t("pricing.test.description")}</span>
            </li>
          </ul>
          {isAuthenticated ? (
            <button
              onClick={() => handleCheckout(testPriceId)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              {t("pricing.test.button")}
            </button>
          ) : (
            <button
              onClick={() => navigate("/account")}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              {t("pricing.test.getStarted")}
            </button>
          )}
        </div>
      ) : null}
      {/* Features Comparison Table */}
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("pricing.comparison.title")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="text-left p-4 font-semibold">{t("pricing.comparison.features")}</th>
                <th className="text-center p-4 font-semibold">
                  {t("pricing.comparison.indicators")}
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    {t("pricing.comparison.singlePlatform")}
                  </span>
                </th>
                <th className="text-center p-4 font-semibold">
                  {t("pricing.comparison.indicators")}
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    {t("pricing.comparison.bothPlatforms")}
                  </span>
                </th>
                <th className="text-center p-4 font-semibold border-l-2 border-indigo-500">
                  {t("pricing.comparison.strategies")}
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    {t("pricing.comparison.singlePlatform")}
                  </span>
                </th>
                <th className="text-center p-4 font-semibold bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-l-2 border-indigo-500">
                  {t("pricing.comparison.strategies")}
                  <br />
                  <span className="text-sm font-normal text-gray-400">
                    {t("pricing.comparison.bothPlatforms")}
                  </span>
                  <br />
                  <span className="text-xs font-bold text-indigo-400 mt-1 block">
                    {t("pricing.comparison.mostPopular")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">{t("pricing.comparison.accessIndicators")}</td>
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
                <td className="p-4 font-medium">{t("pricing.comparison.platformAccess")}</td>
                <td className="text-center p-4 text-gray-400">{t("pricing.comparison.single")}</td>
                <td className="text-center p-4">
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
                    {t("pricing.comparison.bothPlatforms")}
                  </span>
                </td>
                <td className="text-center p-4 text-gray-400 border-l-2 border-indigo-500">
                  {t("pricing.comparison.single")}
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">
                    {t("pricing.comparison.bothPlatforms")}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">
                  {t("pricing.comparison.accessStrategies")}
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
                    {t("pricing.comparison.strategies")}
                  </span>
                </td>
                <td className="text-center p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l-2 border-indigo-500">
                  <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    {t("pricing.comparison.strategies")}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-4 font-medium">{t("pricing.comparison.support")}</td>
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
                  {t("pricing.comparison.newFeatures")}
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
                <td className="p-4 font-medium">{t("pricing.comparison.priorityUpdates")}</td>
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
                    {t("pricing.comparison.priorityUpdates")}
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
