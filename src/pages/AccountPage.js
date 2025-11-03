import React, { useState, useEffect } from "react";
import { SignUp } from "../components/auth/SignUp";
import { SignIn } from "../components/auth/SignIn";
import { SignOut } from "../components/auth/SignOut";
import { Link } from "react-router-dom";
import api from "../api/axios";

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [hasSession, setHasSession] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setHasSession(!!email);
    if (email) {
      setUserEmail(email);
      const fetchSubscriptionStatus = async () => {
        try {
          const { data } = await api.get(
            `/payment/subscription-status/${email}`
          );
          setIsPaid(data.paid);
        } catch (error) {
          console.error("Error fetching subscription status:", error);
        }
      };
      fetchSubscriptionStatus();
    }
  }, []);

  const handleCustomerPortal = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const { data } = await api.post("/payment/customer-portal", { email });
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating customer portal session:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-full pb-40">
      <h1 className="text-4xl font-bold text-center mb-12">Account</h1>
      {hasSession ? (
        <div className="max-w-lg mx-auto text-center">
          {userEmail && (
            <p className="text-lg mb-4">Logged in as: {userEmail}</p>
          )}
          <div className="mt-12 flex justify-center items-center">
            {!isPaid ? (
              <Link
                to="/pricing"
                className="flex w-full mr-[20px] lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 animate-soft-gradient text-w font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:bg-gradient-to-l"
                style={{
                  textDecoration: "none",
                  backgroundSize: "200% 200%",
                  animation: "soft-gradient-x 3s ease-in-out infinite",
                }}
              >
                <span>Select a Plan</span>
              </Link>
            ) : null}
            <button
              onClick={handleCustomerPortal}
              className={`font-bold mr-[20px] px-4 py-2 rounded-lg ${
                isPaid
                  ? "bg-[#5865F2] text-white hover:bg-[#4752C4]"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
              disabled={!isPaid}
            >
              Subscription Settings
            </button>
            <SignOut />
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab("signin")}
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === "signin"
                  ? "text-[#5865F2] border-b-2 border-[#5865F2]"
                  : "text-gray-400"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === "signup"
                  ? "text-[#5865F2] border-b-2 border-[#5865F2]"
                  : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>
          <div className="pt-8">
            {activeTab === "signin" ? <SignIn /> : <SignUp />}
          </div>
        </div>
      )}
    </div>
  );
};
