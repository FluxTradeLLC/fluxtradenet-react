import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function TermsAndConditionsPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">{t("terms.title")}</h1>
        
        <div className="space-y-8 text-gray-300">
          <p className="text-lg">
            {t("terms.welcome")}
          </p>

          {/* Refund Requests Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.refundRequests")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.refundDescription")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {t("terms.refundPoint1")}{" "}
                  <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                    grant@fluxtrade.net
                  </a>
                </li>
                <li>
                  {t("terms.refundPoint2")}
                </li>
                <li>
                  {t("terms.refundPoint3")}{" "}
                  <Link to="/policies" className="underline text-blue-400 hover:text-blue-300">
                    {t("terms.refundPolicies")}
                  </Link>
                </li>
                <li>
                  {t("terms.refundPoint4")}
                </li>
              </ul>
            </div>
          </section>

          {/* Cancellation Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.subscriptionCancellation")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.cancellationDescription")}
              </p>
              <p>
                {t("terms.cancelDescription")}
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  <Link to="/account" className="underline text-blue-400 hover:text-blue-300">
                    {t("terms.cancelStep1")}
                  </Link>
                </li>
                <li>
                  {t("terms.cancelStep2")} <strong>{t("terms.cancelStep2Bold")}</strong> {t("terms.cancelStep2End")}
                </li>
                <li>
                  {t("terms.cancelStep3")}
                </li>
                <li>
                  {t("terms.cancelStep4")}
                </li>
              </ol>
              <p className="mt-4">
                {t("terms.cancellationNote1")}
              </p>
              <p>
                <strong>{t("terms.cancellationImportant")}</strong> {t("terms.cancellationNote2")}
              </p>
            </div>
          </section>

          {/* General Terms Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.generalTerms")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.generalTermsDescription")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {t("terms.generalPoint1")}
                </li>
                <li>
                  {t("terms.generalPoint2")}
                </li>
                <li>
                  {t("terms.generalPoint3")}
                </li>
                <li>
                  {t("terms.generalPoint4")}
                </li>
                <li>
                  {t("terms.generalPoint5")}
                </li>
              </ul>
            </div>
          </section>

          {/* Service Availability Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.serviceAvailability")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.serviceAvailabilityDescription")}
              </p>
            </div>
          </section>

          {/* Limitation of Liability Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.limitationOfLiability")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.limitationDescription")}
              </p>
            </div>
          </section>

          {/* Changes to Terms Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.changesToTerms")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.changesDescription")}
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.contactUs")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.contactDescription")}{" "}
                <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                  grant@fluxtrade.net
                </a>
              </p>
            </div>
          </section>

          {/* Support Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{t("terms.needHelp")}</h2>
            <div className="space-y-4">
              <p>
                {t("terms.helpDescription")}
              </p>
              <p>
                {t("terms.visitSupport")}{" "}
                <Link to="/support" className="underline text-blue-400 hover:text-blue-300">
                  {t("terms.supportPage")}
                </Link>{" "}
                {t("terms.supportPageEnd")}
              </p>
            </div>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            {t("terms.lastUpdated")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;

