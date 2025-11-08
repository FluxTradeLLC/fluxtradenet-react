import React from "react";
import { Link } from "react-router-dom";

export function PolicyPage() {
  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">Refund and Cancellation Policies</h1>
        
        {/* Refund Policy Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Refund Policy</h2>
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
              <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                support
              </a>{" "}
              with your account email and payment details.
            </p>
            <p>- Processing times may vary depending on your payment provider.</p>
          </div>
        </section>

        {/* Cancellation Policy Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Cancellation Policy</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              You may cancel your subscription at any time. To cancel your subscription:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <Link to="/account" className="underline text-blue-400 hover:text-blue-300">
                  Log in to your Account
                </Link>
              </li>
              <li>
                Navigate to the <strong>Subscription Settings</strong> section
              </li>
              <li>
                Click the button to access the Stripe customer portal
              </li>
              <li>
                Follow the prompts to cancel your subscription
              </li>
            </ol>
            <p className="mt-4">
              Once cancelled, your subscription will remain active until the end of your current billing period. You will continue to have access to all features until that time.
            </p>
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              If you have any questions or need assistance with your account, refunds, or cancellations, our support team is here to help.
            </p>
            <p>
              Visit our{" "}
              <Link to="/support" className="underline text-blue-400 hover:text-blue-300">
                Support page
              </Link>{" "}
              to get in touch with us or submit a support request.
            </p>
          </div>
        </section>

        <p className="text-sm text-gray-400 mt-8">
            Last updated: November 7, 2025
          </p>
      </div>
    </div>
  );
}

export default PolicyPage;

