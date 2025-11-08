import React from "react";
import { Link } from "react-router-dom";

export function TermsAndConditionsPage() {
  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">Terms and Conditions</h1>
        
        <div className="space-y-8 text-gray-300">
          <p className="text-lg">
            Welcome to FluxTrade. By accessing and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>

          {/* Refund Requests Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">Refund Requests</h2>
            <div className="space-y-4">
              <p>
                We understand that circumstances may change, and we want to make the refund process as straightforward as possible. If you wish to request a refund:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Refund requests must be submitted by contacting our support team at{" "}
                  <a href="mailto:hello@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                    hello@fluxtrade.net
                  </a>
                </li>
                <li>
                  Please include your account email and payment details in your refund request
                </li>
                <li>
                  Refunds are processed according to our{" "}
                  <Link to="/policies" className="underline text-blue-400 hover:text-blue-300">
                    Refund and Cancellation Policies
                  </Link>
                </li>
                <li>
                  Processing times may vary depending on your payment provider
                </li>
              </ul>
            </div>
          </section>

          {/* Cancellation Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">Subscription Cancellation</h2>
            <div className="space-y-4">
              <p>
                We believe in giving you full control over your subscription. You have the ability to manage and cancel your subscription at any time through your account dashboard.
              </p>
              <p>
                To cancel your subscription, simply:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
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
                We've designed this process to be quick and easy, putting you in control. Once you cancel, your subscription will remain active until the end of your current billing period, and you'll continue to have full access to all features until that time.
              </p>
              <p>
                <strong>Important:</strong> To ensure your subscription is properly cancelled and to avoid any future charges, please complete the cancellation process through your account dashboard. Our support team can cancel subscriptions on your behalf if you need help. It is your responsibility to cancel your subscription or ensure that it has been cancelled by our team in order to avoid future charges.
              </p>
            </div>
          </section>

          {/* General Terms Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">General Terms</h2>
            <div className="space-y-4">
              <p>
                By using our services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Provide accurate and complete information when creating your account
                </li>
                <li>
                  Maintain the security of your account credentials
                </li>
                <li>
                  Use our services in compliance with all applicable laws and regulations
                </li>
                <li>
                  Not share your account access with unauthorized parties
                </li>
                <li>
                  Accept responsibility for all activities that occur under your account
                </li>
              </ul>
            </div>
          </section>

          {/* Service Availability Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">Service Availability</h2>
            <div className="space-y-4">
              <p>
                While we strive to maintain continuous service availability, we do not guarantee that our services will be available at all times. We reserve the right to perform maintenance, updates, or modifications that may temporarily interrupt service.
              </p>
            </div>
          </section>

          {/* Limitation of Liability Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">Limitation of Liability</h2>
            <div className="space-y-4">
              <p>
                Our services are provided for informational and educational purposes. Trading involves substantial risk and is not suitable for every investor. Past performance is not indicative of future results. Please review our disclaimers in the footer for more information.
              </p>
            </div>
          </section>

          {/* Changes to Terms Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">Changes to Terms</h2>
            <div className="space-y-4">
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Material changes will be communicated to users via email or through our website. Continued use of our services after such changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">Contact Us</h2>
            <div className="space-y-4">
              <p>
                If you have any questions about these Terms and Conditions, please contact us at{" "}
                <a href="mailto:hello@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                  hello@fluxtrade.net
                </a>
              </p>
            </div>
          </section>

          {/* Support Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">Need Help?</h2>
            <div className="space-y-4">
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
    </div>
  );
}

export default TermsAndConditionsPage;

