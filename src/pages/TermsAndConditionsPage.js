import React from "react";
import { s } from "../strings.js";
import { Link } from "react-router-dom";

export function TermsAndConditionsPage() {
    return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">{s("terms.title")}</h1>
        
        <div className="space-y-8 text-gray-300">
          <p className="text-lg">
            {s("terms.welcome")}
          </p>

          {/* Refund Requests Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.refundRequests")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.refundDescription")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {s("terms.refundPoint1")}{" "}
                  <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                    grant@fluxtrade.net
                  </a>
                </li>
                <li>
                  {s("terms.refundPoint2")}
                </li>
                <li>
                  {s("terms.refundPoint3")}{" "}
                  <Link to="/policies" className="underline text-blue-400 hover:text-blue-300">
                    {s("terms.refundPolicies")}
                  </Link>
                </li>
                <li>
                  {s("terms.refundPoint4")}
                </li>
              </ul>
            </div>
          </section>

          {/* Cancellation Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.subscriptionCancellation")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.cancellationDescription")}
              </p>
              <p>
                {s("terms.cancelDescription")}
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  <Link to="/account" className="underline text-blue-400 hover:text-blue-300">
                    {s("terms.cancelStep1")}
                  </Link>
                </li>
                <li>
                  {s("terms.cancelStep2")} <strong>{s("terms.cancelStep2Bold")}</strong> {s("terms.cancelStep2End")}
                </li>
                <li>
                  {s("terms.cancelStep3")}
                </li>
                <li>
                  {s("terms.cancelStep4")}
                </li>
              </ol>
              <p className="mt-4">
                {s("terms.cancellationNote1")}
              </p>
              <p>
                <strong>{s("terms.cancellationImportant")}</strong> {s("terms.cancellationNote2")}
              </p>
            </div>
          </section>

          {/* General Terms Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.generalTerms")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.generalTermsDescription")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {s("terms.generalPoint1")}
                </li>
                <li>
                  {s("terms.generalPoint2")}
                </li>
                <li>
                  {s("terms.generalPoint3")}
                </li>
                <li>
                  {s("terms.generalPoint4")}
                </li>
                <li>
                  {s("terms.generalPoint5")}
                </li>
              </ul>
            </div>
          </section>

          {/* Service Availability Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.serviceAvailability")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.serviceAvailabilityDescription")}
              </p>
            </div>
          </section>

          {/* Limitation of Liability Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.limitationOfLiability")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.limitationDescription")}
              </p>
            </div>
          </section>

          {/* Changes to Terms Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.changesToTerms")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.changesDescription")}
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.contactUs")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.contactDescription")}{" "}
                <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                  grant@fluxtrade.net
                </a>
              </p>
            </div>
          </section>

          {/* Support Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-white">{s("terms.needHelp")}</h2>
            <div className="space-y-4">
              <p>
                {s("terms.helpDescription")}
              </p>
              <p>
                {s("terms.visitSupport")}{" "}
                <Link to="/support" className="underline text-blue-400 hover:text-blue-300">
                  {s("terms.supportPage")}
                </Link>{" "}
                {s("terms.supportPageEnd")}
              </p>
            </div>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            {s("terms.lastUpdated")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;

