import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { useBlogTranslation } from "../../i18n/blog/useBlogTranslation";

export const BlogPostPropFirmFailure = () => {
  const t = useBlogTranslation("propFirmFailure");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 pt-12 pb-4 sm:pb-8">
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        canonical="/blog/prop-firm-failure"
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
              {t.sections.shockingFailureRate.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.shockingFailureRate.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.psychologicalTraps.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.psychologicalTraps.intro}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>
                <strong>
                  {t.sections.psychologicalTraps.points.timePressure.label}
                </strong>{" "}
                {t.sections.psychologicalTraps.points.timePressure.text}
              </li>
              <li>
                <strong>
                  {t.sections.psychologicalTraps.points.fearOfFailure.label}
                </strong>{" "}
                {t.sections.psychologicalTraps.points.fearOfFailure.text}
              </li>
              <li>
                <strong>
                  {t.sections.psychologicalTraps.points.overtrading.label}
                </strong>{" "}
                {t.sections.psychologicalTraps.points.overtrading.text}
              </li>
              <li>
                <strong>
                  {t.sections.psychologicalTraps.points.revengeTrading.label}
                </strong>{" "}
                {t.sections.psychologicalTraps.points.revengeTrading.text}
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.riskManagementMistakes.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.riskManagementMistakes.intro}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>
                <strong>
                  {
                    t.sections.riskManagementMistakes.points.dailyLossLimits
                      .label
                  }
                </strong>{" "}
                {t.sections.riskManagementMistakes.points.dailyLossLimits.text}
              </li>
              <li>
                <strong>
                  {
                    t.sections.riskManagementMistakes.points.trailingDrawdowns
                      .label
                  }
                </strong>{" "}
                {
                  t.sections.riskManagementMistakes.points.trailingDrawdowns
                    .text
                }
              </li>
              <li>
                <strong>
                  {
                    t.sections.riskManagementMistakes.points
                      .profitTargetPressure.label
                  }
                </strong>{" "}
                {
                  t.sections.riskManagementMistakes.points.profitTargetPressure
                    .text
                }
              </li>
              <li>
                <strong>
                  {t.sections.riskManagementMistakes.points.noFlexibility.label}
                </strong>{" "}
                {t.sections.riskManagementMistakes.points.noFlexibility.text}
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.strategyFlaws.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.strategyFlaws.intro}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>{t.sections.strategyFlaws.points.untestedMethods}</li>
              <li>{t.sections.strategyFlaws.points.indicators}</li>
              <li>{t.sections.strategyFlaws.points.conditionalStrategies}</li>
              <li>{t.sections.strategyFlaws.points.noClearRules}</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.howToAvoidFailure.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.howToAvoidFailure.intro}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>
                {t.sections.howToAvoidFailure.points.realisticExpectations}
              </li>
              <li>{t.sections.howToAvoidFailure.points.clearCriteria}</li>
              <li>
                {t.sections.howToAvoidFailure.points.provenRiskManagement}
              </li>
              <li>{t.sections.howToAvoidFailure.points.confidence}</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.backtestAdvantage.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.backtestAdvantage.content}
            </p>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3">{t.cta.heading}</h3>
              <p className="text-gray-300 mb-4">{t.cta.description}</p>
              <Link
                to="/backtests/explorer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
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
