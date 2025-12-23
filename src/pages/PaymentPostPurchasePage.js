import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../api/axios";

export function PaymentPostPurchasePage() {
  const { t } = useTranslation();
  const [discordName, setDiscordName] = useState("");
  const [email, setEmail] = useState("");
  const [ntEmail, setNtEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tradingViewUsername, setTradingViewUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/payment/send-post-purchase-info", {
        discordName,
        email,
        ntEmail,
        firstName,
        lastName,
        tradingViewUsername,
      });
      setSuccess(true);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (err) {
      setError(t("paymentPostPurchase.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-full flex flex-col items-center px-4 pt-12 pb-4">
      <h1 className="text-5xl font-extrabold mb-4 text-center text-green-400">
        {t("paymentPostPurchase.congrats")}
      </h1>
      <p className="text-lg text-gray-300 mb-6 max-w-xl">
        {t("paymentPostPurchase.thankYou")}
      </p>
      <p className="text-md text-gray-400 mb-8 max-w-lg">
        {t("paymentPostPurchase.manageAccount")}
      </p>
      <Link
        to="/account"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
      >
        {t("paymentPostPurchase.goToAccount")}
      </Link>
      {/* New Form Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 w-full max-w-md shadow-lg mt-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">{t("paymentPostPurchase.getStarted")}</h2>

        {success ? (
          <div className="text-green-400 font-semibold text-center">
            <p>
              {t("paymentPostPurchase.successMessage")}
            </p>
            <p className="mt-6">
              {t("paymentPostPurchase.tradingViewAccess")}
            </p>
            <p className="mt-6">
              {t("paymentPostPurchase.joinDiscord")}{" "}
              <a className="text-blue-400" href="https://discord.gg/UTcxDRQ26U">
                {t("paymentPostPurchase.discord")}
              </a>
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4">
              {t("paymentPostPurchase.formInstructions")}
            </p>
            <p className="mt-4">
              {t("paymentPostPurchase.ninjaTraderEmail")}
            </p>
            <p className="mt-4">
              {t("paymentPostPurchase.automaticAccess")}
            </p>
            <p className="mt-4">
              {t("paymentPostPurchase.needHelp")}{" "}
              <a href="mailto:grant@fluxtrade.net" className="text-blue-400">
                grant@fluxtrade.net
              </a>
              .
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">{t("paymentPostPurchase.firstName")}</span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={t("paymentPostPurchase.firstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">{t("paymentPostPurchase.lastName")}</span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={t("paymentPostPurchase.lastName")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">{t("paymentPostPurchase.purchaseEmail")}</span>
                <input
                  type="email"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">
                  {t("paymentPostPurchase.ntEmail")}
                </span>
                <input
                  type="email"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  value={ntEmail}
                  onChange={(e) => setNtEmail(e.target.value)}
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">
                  {t("paymentPostPurchase.tradingViewUsername")}
                </span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. tradingview_user"
                  value={tradingViewUsername}
                  onChange={(e) => setTradingViewUsername(e.target.value)}
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">
                  {t("paymentPostPurchase.discordUsername")}
                </span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Trader"
                  value={discordName}
                  onChange={(e) => setDiscordName(e.target.value)}
                  // required
                />
              </label>
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? t("paymentPostPurchase.submitting") : t("paymentPostPurchase.submitInfo")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
