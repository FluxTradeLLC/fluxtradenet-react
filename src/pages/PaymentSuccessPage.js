import React from "react";
import { s } from "../strings.js";
import { Link } from "react-router-dom";

export function PaymentSuccessPage() {
    return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="flex flex-col items-center justify-center text-center px-4 pt-12 pb-4">
        <h1 className="text-5xl font-extrabold mb-4 text-center text-green-500">
          {s("paymentSuccess.title")}
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          {s("paymentSuccess.message")}
        </p>
        <Link
          to="/account"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          {s("paymentSuccess.goToAccount")}
        </Link>
      </div>
    </div>
  );
}
