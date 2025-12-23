import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEO } from "../components/SEO";

export const BlogPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const articles = [
    {
      id: 1,
      title: t("blog.articles.fluxTrident.title"),
      category: t("blog.categories.strategyIntro"),
      excerpt: t("blog.articles.fluxTrident.excerpt"),
      link: "/blog/flux-trident-strategy",
    },
    {
      id: 2,
      title: t("blog.articles.fluxSignal.title"),
      category: t("blog.categories.strategyIntro"),
      excerpt: t("blog.articles.fluxSignal.excerpt"),
      link: "/blog/flux-signal-strategy",
    },
    {
      id: 3,
      title: t("blog.articles.fluxPivot.title"),
      category: t("blog.categories.strategyIntro"),
      excerpt: t("blog.articles.fluxPivot.excerpt"),
      link: "/blog/flux-pivot-strategy",
    },
    {
      id: 4,
      title: t("blog.articles.propFirmHiddenCosts.title"),
      category: t("blog.categories.propFirmPitfalls"),
      excerpt: t("blog.articles.propFirmHiddenCosts.excerpt"),
      link: "/blog/prop-firm-hidden-costs",
    },
    {
      id: 5,
      title: t("blog.articles.propFirmFailure.title"),
      category: t("blog.categories.propFirmPitfalls"),
      excerpt: t("blog.articles.propFirmFailure.excerpt"),
      link: "/blog/prop-firm-failure",
    },
    {
      id: 6,
      title: t("blog.articles.cointegratedPairs.title"),
      category: t("blog.categories.strategyIntro"),
      excerpt: t("blog.articles.cointegratedPairs.excerpt"),
      link: "/blog/cointegrated-pairs-trading",
    },
    {
      id: 7,
      title: t("blog.articles.propFirmDrawdown.title"),
      category: t("blog.categories.propFirmPitfalls"),
      excerpt: t("blog.articles.propFirmDrawdown.excerpt"),
      link: "/blog/prop-firm-drawdown-trap",
    },
    {
      id: 8,
      title: t("blog.articles.orb.title"),
      category: t("blog.categories.strategyIntro"),
      excerpt: t("blog.articles.orb.excerpt"),
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
          <h1 className="text-5xl font-extrabold mb-4">{t("blog.title")}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("blog.subtitle")}
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
                <span>{t("blog.readFullArticle")}</span>
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
          <h2 className="text-3xl font-bold mb-4">{t("blog.readyToStart")}</h2>
          <p className="text-lg mb-6 text-gray-100">
            {t("blog.readyDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/backtests/explorer"
              className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {t("blog.viewStrategies")}
            </Link>
            <Link
              to="/pricing"
              className="bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 border-2 border-white"
            >
              {t("blog.seePricing")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

