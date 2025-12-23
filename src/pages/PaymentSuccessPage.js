import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function PaymentSuccessPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="flex flex-col items-center justify-center text-center px-4 pt-12 pb-4">
        <h1 className="text-5xl font-extrabold mb-4 text-center text-green-500">
          {t("paymentSuccess.title")}
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          {t("paymentSuccess.message")}
        </p>
        <Link
          to="/account"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          {t("paymentSuccess.goToAccount")}
        </Link>
      </div>
    </div>
  );
}
