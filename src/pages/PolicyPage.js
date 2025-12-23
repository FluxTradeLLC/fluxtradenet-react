import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function PolicyPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">{t("policy.title")}</h1>
        
        {/* Refund Policy Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{t("policy.refundPolicy")}</h2>
          <p className="text-gray-300 mb-6">
            {t("policy.refundDescription")}
          </p>
          <div className="space-y-4 text-gray-300">
            <p>
              - {t("policy.refundPoint1")}
            </p>
            <p>
              - {t("policy.refundPoint2")}
            </p>
            <p>
              - {t("policy.refundPoint3")}{" "}
              <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                {t("policy.refundPoint3Support")}
              </a>{" "}
              {t("policy.refundPoint3Details")}
            </p>
            <p>- {t("policy.refundPoint4")}</p>
          </div>
        </section>

        {/* Cancellation Policy Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">{t("policy.cancellationPolicy")}</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              {t("policy.cancellationDescription")}
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <Link to="/account" className="underline text-blue-400 hover:text-blue-300">
                  {t("policy.cancelStep1")}
                </Link>
              </li>
              <li>
                {t("policy.cancelStep2")} <strong>{t("policy.cancelStep2Bold")}</strong> {t("policy.cancelStep2End")}
              </li>
              <li>
                {t("policy.cancelStep3")}
              </li>
              <li>
                {t("policy.cancelStep4")}
              </li>
            </ol>
            <p className="mt-4">
              {t("policy.cancellationNote")}
            </p>
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">{t("policy.needHelp")}</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              {t("policy.helpDescription")}
            </p>
            <p>
              {t("policy.visitSupport")}{" "}
              <Link to="/support" className="underline text-blue-400 hover:text-blue-300">
                {t("policy.supportPage")}
              </Link>{" "}
              {t("policy.supportPageEnd")}
            </p>
          </div>
        </section>

        <p className="text-sm text-gray-400 mt-8">
            {t("policy.lastUpdated")}
          </p>
      </div>
    </div>
  );
}

export default PolicyPage;

