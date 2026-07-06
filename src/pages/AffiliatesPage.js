import React from "react";
import { s } from "../strings.js";

export function AffiliatesPage() {
    return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          {s("affiliates.title")}
        </h1>
        <p className="text-lg text-gray-300 mb-10 text-center max-w-3xl mx-auto">
          {s("affiliates.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-4xl font-extrabold text-indigo-400 mb-2">{s("affiliates.commission")}</p>
            <p className="text-gray-300">
              {s("affiliates.commissionDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{s("affiliates.payouts")}</p>
            <p className="text-gray-300">
              {s("affiliates.payoutsDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{s("affiliates.useAssets")}</p>
            <p className="text-gray-300">
              {s("affiliates.useAssetsDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{s("affiliates.freeTrial")}</p>
            <p className="text-gray-300">
              {s("affiliates.freeTrialDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{s("affiliates.powerfulTools")}</p>
            <p className="text-gray-300">
              {s("affiliates.powerfulToolsDesc")}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">{s("affiliates.growingCommunity")}</p>
            <p className="text-gray-300">
              {s("affiliates.growingCommunityDesc")}
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
            {s("affiliates.joinProgram")}
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
          <h2 className="text-2xl font-bold">{s("affiliates.programDetails")}</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              {s("affiliates.commissionLabel")}{" "}
              <span className="font-semibold text-white">{s("affiliates.commissionValue")}</span> {s("affiliates.commissionFull")}
            </li>
            <li>
              {s("affiliates.payoutTerms")}{" "}
              <span className="font-semibold text-white">{s("affiliates.payoutValue")}</span> {s("affiliates.payoutMethod")}
            </li>
            <li>
              {s("affiliates.attribution")}
            </li>
            <li>
              {s("affiliates.marketingAssets")}
              <a
                className="text-indigo-400 hover:text-indigo-300 ml-1"
                href="https://www.youtube.com/@FluxTradeLLC"
                target="_blank"
                rel="noopener noreferrer"
              >
                @FluxTradeLLC
              </a>
              . {s("affiliates.marketingMaterialsDesc")}{" "}
              <a
                href="https://drive.google.com/drive/folders/1uWxQeNQLEhiq8swh375AQVEkOc_mEn8Z?usp=sharing"
                className="text-indigo-400 hover:text-indigo-300"
              >
                {s("affiliates.marketingMaterials")}
              </a>{" "}
              {s("affiliates.marketingMaterialsDesc")}
            </li>
            <li>
              {s("affiliates.getStarted")}
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
              {s("affiliates.questions")}{" "}
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
