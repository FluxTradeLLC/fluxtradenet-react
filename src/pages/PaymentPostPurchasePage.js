import React, { useState } from "react";
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
      setError("Failed to submit info. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-full flex flex-col items-center px-4 pt-12 pb-4">
      <h1 className="text-5xl font-extrabold mb-4 text-center text-green-400">
        Congrats, your purchase is complete! 🎉
      </h1>
      <p className="text-lg text-gray-300 mb-6 max-w-xl">
        Thank you for joining FluxTrade! Your subscription is now active and you
        have full access to all premium features. Check your email for a receipt
        and onboarding instructions. If you have any questions, our support team
        is here to help.
      </p>
      <p className="text-md text-gray-400 mb-8 max-w-lg">
        You can manage your account, view your subscription, and get started
        with our tools from your account dashboard.
      </p>
      <Link
        to="/account"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
      >
        Go to My Account
      </Link>
      {/* New Form Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 w-full max-w-md shadow-lg mt-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Get Started</h2>

        {success ? (
          <div className="text-green-400 font-semibold text-center">
            <p>
              Info submitted successfully! We'll add access for these accounts
              shortly. In the meantime, please check your email for information
              on how to download and install the Add-ons. 🚀
            </p>
            <p className="mt-6">
              Access to TradingView scripts is fully automated, but takes around
              30 minutes. Access to NinjaTrader licenses is also fully
              automated, and only takes a few minutes.
            </p>
            <p className="mt-6">
              Join the{" "}
              <a className="text-blue-400" href="https://discord.gg/UTcxDRQ26U">
                Discord!
              </a>
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4">
              Please enter your Discord username (optional) and NinjaTrader
              Account email (if different from the other email) and/or
              TradingView username in the form below, and we will get you set up
              with your license on our end.
            </p>
            <p className="mt-4">
              We are using NinjaTrader's new email licensing system, and no
              longer need machine ID's.
            </p>
            <p className="mt-4">
              Granting access and adding licenses and Discord roles is all done
              automatically, so please ensure all fields are correct before
              submitting.
            </p>
            <p className="mt-4">
              Need help? Email us at{" "}
              <a href="mailto:hello@fluxtrade.net" className="text-blue-400">
                hello@fluxtrade.net
              </a>
              .
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">First Name</span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">Last Name</span>
                <input
                  type="text"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">Purchase Email</span>
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
                  NinjaTrader Account Email (if different)
                </span>
                <input
                  type="email"
                  className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  value={ntEmail}
                  onChange={(e) => setNtEmail(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col text-left">
                <span className="mb-1 font-semibold">
                  TradingView Username (this is not an email)
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
                  Discord Username (this is not an email)
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
                {loading ? "Submitting..." : "Submit Info"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
