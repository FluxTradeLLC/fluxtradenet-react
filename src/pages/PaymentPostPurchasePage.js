import React, { useState } from "react";
import { s } from "../strings.js";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export function PaymentPostPurchasePage() {
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
      setError(s("paymentPostPurchase.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-full flex flex-col items-center px-4 pt-12 pb-4">
      <h1 className="text-5xl font-extrabold mb-4 text-center text-green-400">
        {s("paymentPostPurchase.congrats")}
      </h1>
      <p className="text-lg text-gray-300 mb-6 max-w-xl">
        {s("paymentPostPurchase.thankYou")}
      </p>
      <p className="text-md text-gray-400 mb-8 max-w-lg">
        {s("paymentPostPurchase.manageAccount")}
      </p>
      <Link
        to="/account"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
      >
        {s("paymentPostPurchase.goToAccount")}
      </Link>
      {/* New Form Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 w-full max-w-md shadow-lg mt-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">{s("paymentPostPurchase.getStarted")}</h2>

        {success ? (
          <div className="text-green-400 font-semibold text-center">
            <p>
              {s("paymentPostPurchase.successMessage")}
            </p>
            <p className="mt-6">
              {s("paymentPostPurchase.tradingViewAccess")}
            </p>
            <p className="mt-6">
              {s("paymentPostPurchase.joinDiscord")}{" "}
              <a className="text-blue-400" href="https://discord.gg/UTcxDRQ26U">
                {s("paymentPostPurchase.discord")}
              </a>
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4">
              {s("paymentPostPurchase.formInstructions")}
            </p>
            <p className="mt-4">
              {s("paymentPostPurchase.ninjaTraderEmail")}
            </p>
            <p className="mt-4">
              {s("paymentPostPurchase.automaticAccess")}
            </p>
            <p className="mt-4">
              {s("paymentPostPurchase.needHelp")}{" "}
              <a href="mailto:grant@fluxtrade.net" className="text-blue-400">
                grant@fluxtrade.net
              </a>
              .
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">{s("paymentPostPurchase.firstName")}</span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={s("paymentPostPurchase.firstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">{s("paymentPostPurchase.lastName")}</span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={s("paymentPostPurchase.lastName")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">{s("paymentPostPurchase.purchaseEmail")}</span>
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
                  {s("paymentPostPurchase.ntEmail")}
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
                  {s("paymentPostPurchase.tradingViewUsername")}
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
                  {s("paymentPostPurchase.discordUsername")}
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
                {loading ? s("paymentPostPurchase.submitting") : s("paymentPostPurchase.submitInfo")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
