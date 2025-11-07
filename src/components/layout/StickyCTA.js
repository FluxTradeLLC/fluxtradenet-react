import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export const StickyCTA = () => {
  const [activePlatform, setActivePlatform] = useState("NinjaTrader");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setIsAuthenticated(true);
    }
  }, []);

  const PRICING_IDS = {
    LOCAL: {
      PRO_SINGLE_NT: "price_1Rk971DHqntRcM5i5pndgfLL",
      PRO_SINGLE_TV: "price_1SCOIADHqntRcM5ilHuIjjTA",
      PRO_BOTH: "price_1SCOIgDHqntRcM5ilbjDXU7y",
    },
    PRODUCTION: {
      PRO_SINGLE_NT: "price_1RkWkcDHqntRcM5i4MakObtw",
      PRO_SINGLE_TV: "price_1SCOFJDHqntRcM5iMcAPakLT",
      PRO_BOTH: "price_1SCOGgDHqntRcM5irQtSptbE",
    },
  };

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
      priceId = PRICING_IDS[envKey].PRO_SINGLE_NT;
    } else if (activePlatform === "TradingView") {
      priceId = PRICING_IDS[envKey].PRO_SINGLE_TV;
    } else {
      priceId = PRICING_IDS[envKey].PRO_BOTH;
    }

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
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              NinjaTrader
            </button>
            <button
              onClick={() => setActivePlatform("TradingView")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePlatform === "TradingView"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              TradingView
            </button>
            <button
              onClick={() => setActivePlatform("Both")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePlatform === "Both"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Both Platforms
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleStartTrial}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap"
          >
            {isAuthenticated ? "Start Free Trial (30 days)" : "Sign Up To Start Free Trial (30 days)"}
          </button>
        </div>
      </div>
    </div>
  );
};

