import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { PRICING_IDS } from "../../constants";

export const StickyCTA = () => {
  const [activePlatform, setActivePlatform] = useState(() => {
    const savedPlatform = localStorage.getItem("stickyCTAActivePlatform");
    return savedPlatform || "NinjaTrader";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stickyCTAActivePlatform", activePlatform);
  }, [activePlatform]);

  const envKey = process.env.REACT_APP_NODE_ENV
    ? process.env.REACT_APP_NODE_ENV.toUpperCase()
    : "LOCAL";

  const handleStartTrial = async () => {
    if (!isAuthenticated) {
      navigate("/account");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    let priceId;
    if (activePlatform === "NinjaTrader") {
      priceId = PRICING_IDS[envKey].MONTHLY.STRATEGIES_NT_ONLY;
    } else if (activePlatform === "TradingView") {
      priceId = PRICING_IDS[envKey].MONTHLY.STRATEGIES_TV_ONLY;
    } else {
      priceId = PRICING_IDS[envKey].MONTHLY.STRATEGIES_NT_AND_TV;
    }

    try {
      const response = await api.post("/payment/create-checkout-session", {
        priceId: priceId,
        subscription: true,
        referral: window.promotekit_referral,
        billingPeriod: "monthly",
      });
      // Redirect to Stripe checkout
      window.location.href = response.data.redirect;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Platform Toggle */}
          <div className="inline-flex rounded-lg bg-gray-800 p-1 flex-wrap justify-center">
            <button
              onClick={() => setActivePlatform("NinjaTrader")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePlatform === "NinjaTrader"
                  ? "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              NinjaTrader
            </button>
            <button
              onClick={() => setActivePlatform("TradingView")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePlatform === "TradingView"
                  ? "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              TradingView
            </button>
            <button
              onClick={() => setActivePlatform("Both")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePlatform === "Both"
                  ? "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Both Platforms
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleStartTrial}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 animate-soft-gradient text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:bg-gradient-to-l whitespace-nowrap"
            style={{
              backgroundSize: "200% 200%",
              animation: "soft-gradient-x 3s ease-in-out infinite",
            }}
          >
            {isAuthenticated
              ? "Start Free Trial (30 days)"
              : "Sign Up To Start Free Trial (30 days)"}
          </button>
        </div>
      </div>
    </div>
  );
};
