import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { useBlogTranslation } from "../../i18n/blog/useBlogTranslation";

export const BlogPostFluxTrident = () => {
  const t = useBlogTranslation("fluxTrident");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 pt-12 pb-4 sm:pb-8">
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        canonical="/blog/flux-trident-strategy"
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
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
              {t.category}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-6">{t.title}</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">{t.subtitle}</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.whatIsFluxTrident.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.whatIsFluxTrident.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.coreComponents.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.coreComponents.intro}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              {t.sections.coreComponents.points.map((point, index) => (
                <li key={index}>
                  <strong>{point.label}</strong> {point.text}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.whyItWorks.heading}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t.sections.whyItWorks.content}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {t.sections.keyAdvantages.heading}
            </h2>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              {t.sections.keyAdvantages.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3">{t.cta.heading}</h3>
              <p className="text-gray-300 mb-4">{t.cta.description}</p>
              <Link
                to="/backtests/explorer?strategy=fluxTrident"
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
