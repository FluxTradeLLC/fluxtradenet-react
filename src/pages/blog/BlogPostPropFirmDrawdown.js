import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const BlogPostPropFirmDrawdown = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 pt-12 pb-4 sm:pb-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        <article className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
              Prop Firm Pitfalls
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-6">
            The Prop Firm Drawdown Trap
          </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              Prop firms set drawdown limits that seem generous on paper but are actually designed to catch you off guard. Understand how daily drawdowns, trailing drawdowns, and hidden rules can end your challenge prematurely.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">The Drawdown Illusion</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Prop firms advertise drawdown limits like "5% maximum drawdown" or "10% trailing drawdown," which sound reasonable. But these limits are calculated in ways that make them much more restrictive than they appear. Understanding how drawdowns are calculated is crucial to avoiding this trap.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Daily Drawdown Limits</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Many prop firms have daily drawdown limits—if your account drops by a certain percentage in a single day, you're out. This sounds fair, but consider this scenario: You start the day with a $10,000 account. You make $500 in the morning, bringing your balance to $10,500. Then you lose $600 in the afternoon. Your account is now $9,900—still above your starting balance—but many firms calculate the daily drawdown from the day's peak, not the starting balance. That $600 loss from $10,500 might violate your daily limit even though you're still profitable.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Trailing Drawdowns: The Moving Target</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Trailing drawdowns are even more insidious. As you profit, your drawdown limit moves up with your account balance. For example, if you start with a $10,000 account and a 10% trailing drawdown, your limit starts at $9,000. But if you profit to $11,000, your new limit becomes $9,900. If you then drop back to $10,000, you've violated the trailing drawdown even though you're still profitable overall.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">The Hidden Rules</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Prop firms often have additional drawdown rules buried in their terms:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Opening Balance Drawdown:</strong> Some calculate from your opening balance each day, not your peak</li>
              <li><strong>Equity vs. Balance:</strong> Drawdowns calculated on equity (including open positions) vs. balance</li>
              <li><strong>Weekend Gaps:</strong> Gaps over weekends can trigger drawdown violations</li>
              <li><strong>Multiple Account Rules:</strong> If you have multiple accounts, losses in one can affect others</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why This Design Exists</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Prop firms design these rules to maximize failure rates. They profit from challenge fees, not from successful traders. The more traders fail, the more money they make. Trailing drawdowns are particularly effective at this—they create a moving target that becomes harder to hit as you profit, ensuring most traders eventually fail.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Real-World Example</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Imagine you start a $10,000 challenge with a 10% trailing drawdown. You trade well and reach $12,000. Your trailing drawdown limit is now $10,800. You have a bad day and drop to $10,500. You're still up $500 from your start, but you've violated the trailing drawdown and failed the challenge. This is how trailing drawdowns catch even profitable traders.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">How to Protect Yourself</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              The best protection is understanding exactly how your drawdown is calculated. Read the fine print carefully. But even then, these rules are designed to be restrictive. Consider alternatives that don't have these traps—options that give you more control over your trading and better economics.
            </p>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3">Find Better Alternatives</h3>
              <p className="text-gray-300 mb-4">
                Explore our pricing options that give you access to proven strategies without the restrictive drawdown rules and profit splits of prop firms.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Find Better Alternatives
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

