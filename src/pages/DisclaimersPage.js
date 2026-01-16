import React from "react";
import { useTranslation } from "react-i18next";

export function DisclaimersPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-8 text-center">
          {t("footer.disclaimers")}
        </h1>

        {/* General Trading Disclaimers Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {t("footer.disclaimers")}
          </h2>
          <div className="space-y-6 text-gray-300">
            <p>{t("footer.disclaimer1")}</p>
            <p>{t("footer.disclaimer2")}</p>
          </div>
        </section>

        {/* Wins Section Disclaimer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {t("footer.testimonialDisclosure")}
          </h2>
          <div className="space-y-6 text-gray-300">
            <p>{t("landing.winsDisclaimer")}</p>
          </div>
        </section>

        {/* Streaming Disclaimer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {t("footer.liveTradingRoomDisclosure")}
          </h2>
          <div className="space-y-6 text-gray-300">
            <p>{t("streaming.disclaimer")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DisclaimersPage;
