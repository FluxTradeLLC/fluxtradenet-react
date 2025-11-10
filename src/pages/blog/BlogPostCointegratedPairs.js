import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const BlogPostCointegratedPairs = () => {
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
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
              Strategy Intro
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-6">
            Cointegrated Pairs Trading Explained
          </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              Pairs trading isn't just for institutions. Learn how cointegrated pairs trading works, why it's less risky than directional trading, and how to identify profitable pair opportunities in futures markets.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">What is Pairs Trading?</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Pairs trading is a market-neutral strategy that involves buying one asset while simultaneously selling another related asset. The goal isn't to profit from the direction of either asset individually, but from the relationship between them. When two assets are cointegrated, they move together over time, but their prices can temporarily diverge.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Cointegration</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Cointegration means two assets have a long-term equilibrium relationship. Even if their prices drift apart temporarily, they tend to return to their historical relationship. This creates trading opportunities when the spread between the two assets becomes too wide—you can bet it will revert to the mean.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why It's Less Risky</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Pairs trading offers several advantages over directional trading:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Market Neutral:</strong> Profits come from the relationship, not market direction</li>
              <li><strong>Reduced Volatility:</strong> Long and short positions offset each other</li>
              <li><strong>Lower Correlation to Market:</strong> Works in up, down, and sideways markets</li>
              <li><strong>Statistical Edge:</strong> Based on mean reversion, a proven market phenomenon</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">How to Identify Pairs</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Not all asset pairs are suitable for trading. Good pairs have:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>High historical correlation (typically above 0.7)</li>
              <li>Cointegration confirmed by statistical tests</li>
              <li>Regular mean reversion behavior</li>
              <li>Sufficient liquidity for both assets</li>
              <li>Similar contract sizes or proper hedging ratios</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">The Trading Process</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              When the spread between two cointegrated assets widens beyond historical norms, you:
            </p>
            <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
              <li>Buy the underperforming asset (it's likely to catch up)</li>
              <li>Short the outperforming asset (it's likely to pull back)</li>
              <li>Wait for the spread to revert to its mean</li>
              <li>Close both positions when the relationship normalizes</li>
            </ol>

            <h2 className="text-2xl font-bold mt-8 mb-4">Common Pairs in Futures</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Some popular futures pairs include:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Crude oil vs. Natural gas</li>
              <li>Gold vs. Silver</li>
              <li>Different equity index futures</li>
              <li>Related agricultural commodities</li>
              <li>Currency pairs with economic relationships</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Risk Management</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              While pairs trading is less risky than directional trading, it's not risk-free. The main risk is that the relationship breaks down permanently—what was once cointegrated may no longer be. Proper position sizing, stop losses, and monitoring the relationship are essential.
            </p>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3">Check Strategy Performance</h3>
              <p className="text-gray-300 mb-4">
                See how our cointegrated pairs strategy performs with detailed backtest results across different market conditions.
              </p>
              <Link
                to="/backtests/explorer?strategy=cointegratedPairs"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Check Strategy Performance
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

