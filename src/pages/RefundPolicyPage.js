import React from "react";

export function RefundPolicyPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-6">Refund Policy</h1>
        <p className="text-gray-300 mb-6">
          We offer prorated refunds for the most recent payment only.
        </p>
        <div className="space-y-4 text-gray-300">
          <p>
            - Refunds apply solely to your latest successful payment. Earlier
            payments are not eligible.
          </p>
          <p>
            - The refund amount is prorated based on the remaining time in your
            current billing period at the time of request.
          </p>
          <p>
            - To initiate a refund, please contact{" "}
            <a href="mailto:grant@fluxtrade.net" className="underline">
              support
            </a>{" "}
            with your account email and payment details.
          </p>
          <p>- Processing times may vary depending on your payment provider.</p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicyPage;
