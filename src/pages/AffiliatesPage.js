import React from "react";
import { useTranslation } from "react-i18next";

export function AffiliatesPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          {t("affiliates.title")}
        </h1>
        <p className="text-lg text-gray-300 mb-10 text-center max-w-3xl mx-auto">
          {t("affiliates.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-4xl font-extrabold text-indigo-400 mb-2">{t("affiliates.commission")}</p>
            <p className="text-gray-300">
              {t("affiliates.commissionDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{t("affiliates.payouts")}</p>
            <p className="text-gray-300">
              {t("affiliates.payoutsDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{t("affiliates.useAssets")}</p>
            <p className="text-gray-300">
              {t("affiliates.useAssetsDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{t("affiliates.freeTrial")}</p>
            <p className="text-gray-300">
              {t("affiliates.freeTrialDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{t("affiliates.powerfulTools")}</p>
            <p className="text-gray-300">
              {t("affiliates.powerfulToolsDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{t("affiliates.growingCommunity")}</p>
            <p className="text-gray-300">
              {t("affiliates.growingCommunityDesc")}
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <a
            href="https://fluxtrade.promotekit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300"
          >
            {t("affiliates.joinProgram")}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">{t("affiliates.programDetails")}</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              {t("affiliates.commissionLabel")}{" "}
              <span className="font-semibold text-white">{t("affiliates.commissionValue")}</span> {t("affiliates.commissionFull")}
            </li>
            <li>
              {t("affiliates.payoutTerms")}{" "}
              <span className="font-semibold text-white">{t("affiliates.payoutValue")}</span> {t("affiliates.payoutMethod")}
            </li>
            <li>
              {t("affiliates.attribution")}
            </li>
            <li>
              {t("affiliates.marketingAssets")}
              <a
                className="text-indigo-400 hover:text-indigo-300 ml-1"
                href="https://www.youtube.com/@FluxTradeLLC"
                target="_blank"
                rel="noopener noreferrer"
              >
                @FluxTradeLLC
              </a>
              . {t("affiliates.marketingMaterialsDesc")}{" "}
              <a
                href="https://drive.google.com/drive/folders/1uWxQeNQLEhiq8swh375AQVEkOc_mEn8Z?usp=sharing"
                className="text-indigo-400 hover:text-indigo-300"
              >
                {t("affiliates.marketingMaterials")}
              </a>{" "}
              {t("affiliates.marketingMaterialsDesc")}
            </li>
            <li>
              {t("affiliates.getStarted")}
              <a
                className="text-indigo-400 hover:text-indigo-300 ml-1"
                href="https://fluxtrade.promotekit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                fluxtrade.promotekit.com
              </a>
              .
            </li>
            <li>
              {t("affiliates.questions")}{" "}
              <a
                className="text-indigo-400 hover:text-indigo-300"
                href="mailto:grant@fluxtrade.net"
              >
                grant@fluxtrade.net
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
