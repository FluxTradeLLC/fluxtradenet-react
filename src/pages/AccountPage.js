import React, { useState, useEffect } from "react";
import { SignUp } from "../components/auth/SignUp";
import { SignIn } from "../components/auth/SignIn";
import { SignOut } from "../components/auth/SignOut";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useTranslation } from "react-i18next";

export const AccountPage = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
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
    <div className="bg-gray-900 text-white min-h-full pb-40 pt-12">
      <h1 className="text-5xl font-extrabold mb-4 text-center">{t("account.title")}</h1>
      {hasSession ? (
        <div className="max-w-lg mx-auto text-center">
          {userEmail && <p className="text-lg">{t("account.loggedInAs", { email: userEmail })}</p>}
          <div className="flex justify-center items-center">
            <div className="mt-4 flex flex-col gap-4 justify-center items-center">
              {!isPaid ? (
                <>
                  <h3 className="text-2xl font-bold mt-8 text-center">
                    {t("account.signUpForPlan")}
                  </h3>
                  <p>{t("account.freeTrialOffer")}</p>
                  <Link
                    to="/pricing"
                    className={`flex w-full lg:w-auto max-w-[500px] justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 ${prefersReducedMotion ? "" : "animate-soft-gradient"} text-w font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:bg-gradient-to-l`}
                    style={{
                      textDecoration: "none",
                      backgroundSize: "200% 200%",
                      animation: prefersReducedMotion
                        ? "none"
                        : "soft-gradient-x 3s ease-in-out infinite",
                    }}
                  >
                    <span>{t("account.selectPlan")}</span>
                  </Link>
                </>
              ) : null}
              <h3 className="text-2xl font-bold mt-8 text-center">
                {t("account.subscriptionSettings")}
              </h3>
              <p>
                {t("account.subscriptionSettingsDescription")}
              </p>
              <button
                onClick={handleCustomerPortal}
                // disabled={!isPaid}
                className={`font-bold px-4 py-2 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4]`}
                aria-label={t("account.subscriptionSettingsAriaLabel")}
                // aria-disabled={!isPaid}
              >
                {t("account.subscriptionSettingsButton")}
              </button>
              <h3 className="text-2xl font-bold mt-8">{t("account.signOut")}</h3>
              <SignOut />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div
            className="flex border-b border-gray-700"
            role="tablist"
            aria-label={t("account.accountAuthentication")}
          >
            <button
              onClick={() => setActiveTab("signin")}
              role="tab"
              aria-selected={activeTab === "signin"}
              aria-controls="signin-panel"
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === "signin"
                  ? "text-[#5865F2] border-b-2 border-[#5865F2]"
                  : "text-gray-400"
              }`}
            >
              {t("account.signIn")}
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              role="tab"
              aria-selected={activeTab === "signup"}
              aria-controls="signup-panel"
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === "signup"
                  ? "text-[#5865F2] border-b-2 border-[#5865F2]"
                  : "text-gray-400"
              }`}
            >
              {t("account.signUp")}
            </button>
          </div>
          <div
            className="pt-8"
            role="tabpanel"
            id={activeTab === "signin" ? "signin-panel" : "signup-panel"}
          >
            {activeTab === "signin" ? <SignIn /> : <SignUp />}
          </div>
        </div>
      )}
    </div>
  );
};
