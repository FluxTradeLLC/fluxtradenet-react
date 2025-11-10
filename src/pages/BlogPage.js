import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";

export const BlogPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const articles = [
    {
      id: 1,
      title: "Introduction to Flux Trident Strategy",
      category: "Strategy Intro",
      excerpt:
        "Flux Trident is a multi-timeframe confluence strategy that combines trend analysis with momentum indicators. Learn how this systematic approach identifies high-probability entries across various market conditions.",
      link: "/blog/flux-trident-strategy",
    },
    {
      id: 2,
      title: "Understanding Flux Signal Strategy",
      category: "Strategy Intro",
      excerpt:
        "The Flux Signal strategy uses proprietary indicators to identify early trend reversals and continuation patterns. This article breaks down the core concepts and entry criteria that make this strategy effective.",
      link: "/blog/flux-signal-strategy",
    },
    {
      id: 3,
      title: "Flux Pivot: Trading Support and Resistance",
      category: "Strategy Intro",
      excerpt:
        "Master the art of trading key pivot levels with Flux Pivot. This strategy focuses on identifying and trading off significant support and resistance zones, combining price action with volume analysis.",
      link: "/blog/flux-pivot-strategy",
    },
    {
      id: 4,
      title: "The Hidden Costs of Prop Firm Challenges",
      category: "Prop Firm Pitfalls",
      excerpt:
        "Many traders don't realize the true cost of prop firm challenges until it's too late. From hidden fees to unrealistic profit targets, learn about the common pitfalls that can derail your funded account journey.",
      link: "/blog/prop-firm-hidden-costs",
    },
    {
      id: 5,
      title: "Why Most Prop Firm Traders Fail (And How to Avoid It)",
      category: "Prop Firm Pitfalls",
      excerpt:
        "Over 90% of prop firm traders fail their challenges. Discover the psychological traps, risk management mistakes, and strategy flaws that lead to failure—and how proven backtested strategies can give you an edge.",
      link: "/blog/prop-firm-failure",
    },
    {
      id: 6,
      title: "Cointegrated Pairs Trading Explained",
      category: "Strategy Intro",
      excerpt:
        "Pairs trading isn't just for institutions. Learn how cointegrated pairs trading works, why it's less risky than directional trading, and how to identify profitable pair opportunities in futures markets.",
      link: "/blog/cointegrated-pairs-trading",
    },
    {
      id: 7,
      title: "The Prop Firm Drawdown Trap",
      category: "Prop Firm Pitfalls",
      excerpt:
        "Prop firms set drawdown limits that seem generous on paper but are actually designed to catch you off guard. Understand how daily drawdowns, trailing drawdowns, and hidden rules can end your challenge prematurely.",
      link: "/blog/prop-firm-drawdown-trap",
    },
    {
      id: 8,
      title: "ORB Strategy: Trading the Opening Range",
      category: "Strategy Intro",
      excerpt:
        "The Opening Range Breakout (ORB) strategy capitalizes on the first hour's volatility. This article explains how to identify high-probability breakouts and manage risk when trading the market open.",
      link: "/blog/orb-strategy",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 pt-12 pb-4 sm:pb-8">
      <SEO
        title="Trading Strategy Blog & Educational Content"
        description="Learn trading strategies, understand prop firm challenges, and discover proven backtested approaches. Educational content covering Flux Trident, Flux Signal, Flux Pivot, and more trading strategies."
        keywords="trading blog, trading strategies, prop firm trading, trading education, backtested strategies, trading tips, flux trident, flux signal, flux pivot"
        canonical="/blog"
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Educational content to help you understand trading strategies and
            navigate the prop firm landscape
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200 border border-gray-700 hover:border-gray-600"
            >
              <div className="mb-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
                  {article.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white">
                {article.title}
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {article.excerpt}
              </p>
              <Link
                to={article.link}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 group"
              >
                <span>Read Full Article</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-lg mb-6 text-gray-100">
            Explore our backtested strategies and find the right plan for your
            trading journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/backtests/explorer"
              className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              View All Strategies
            </Link>
            <Link
              to="/pricing"
              className="bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 border-2 border-white"
            >
              See Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

