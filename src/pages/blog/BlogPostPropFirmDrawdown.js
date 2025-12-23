import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { useBlogTranslation } from "../../i18n/blog/useBlogTranslation";

export const BlogPostPropFirmDrawdown = () => {
  const t = useBlogTranslation("propFirmDrawdown");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 pt-12 pb-4 sm:pb-8">
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        canonical="/blog/prop-firm-drawdown-trap"
        ogType="article"
        article={{
          datePublished: "2024-01-01",
          dateModified: "2024-01-01",
        }}
      />
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
          {t.backToBlog}
        </Link>

        <article className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
              {t.category}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-6">{t.title}</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">{t.subtitle}</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.drawdownIllusion.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.drawdownIllusion.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.dailyDrawdownLimits.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.dailyDrawdownLimits.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.trailingDrawdowns.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.trailingDrawdowns.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.hiddenRules.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.hiddenRules.intro}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>
                <strong>
                  {t.sections.hiddenRules.points.openingBalance.label}
                </strong>{" "}
                {t.sections.hiddenRules.points.openingBalance.text}
              </li>
              <li>
                <strong>
                  {t.sections.hiddenRules.points.equityVsBalance.label}
                </strong>{" "}
                {t.sections.hiddenRules.points.equityVsBalance.text}
              </li>
              <li>
                <strong>
                  {t.sections.hiddenRules.points.weekendGaps.label}
                </strong>{" "}
                {t.sections.hiddenRules.points.weekendGaps.text}
              </li>
              <li>
                <strong>
                  {t.sections.hiddenRules.points.multipleAccounts.label}
                </strong>{" "}
                {t.sections.hiddenRules.points.multipleAccounts.text}
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.whyDesignExists.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.whyDesignExists.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.realWorldExample.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.realWorldExample.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.howToProtect.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.howToProtect.content}
            </p>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3">{t.cta.heading}</h3>
              <p className="text-gray-300 mb-4">{t.cta.description}</p>
              <Link
                to="/pricing"
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {t.cta.button}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
