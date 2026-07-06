import React from "react";
import { s } from "../strings.js";
import { Link } from "react-router-dom";

export function PolicyPage() {
    return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-center">{s("policy.title")}</h1>
        
        {/* Refund Policy Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{s("policy.refundPolicy")}</h2>
          <p className="text-gray-300 mb-6">
            {s("policy.refundDescription")}
          </p>
          <div className="space-y-4 text-gray-300">
            <p>
              - {s("policy.refundPoint1")}
            </p>
            <p>
              - {s("policy.refundPoint2")}
            </p>
            <p>
              - {s("policy.refundPoint3")}{" "}
              <a href="mailto:grant@fluxtrade.net" className="underline text-blue-400 hover:text-blue-300">
                {s("policy.refundPoint3Support")}
              </a>{" "}
              {s("policy.refundPoint3Details")}
            </p>
            <p>- {s("policy.refundPoint4")}</p>
          </div>
        </section>

        {/* Cancellation Policy Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">{s("policy.cancellationPolicy")}</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              {s("policy.cancellationDescription")}
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <Link to="/account" className="underline text-blue-400 hover:text-blue-300">
                  {s("policy.cancelStep1")}
                </Link>
              </li>
              <li>
                {s("policy.cancelStep2")} <strong>{s("policy.cancelStep2Bold")}</strong> {s("policy.cancelStep2End")}
              </li>
              <li>
                {s("policy.cancelStep3")}
              </li>
              <li>
                {s("policy.cancelStep4")}
              </li>
            </ol>
            <p className="mt-4">
              {s("policy.cancellationNote")}
            </p>
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">{s("policy.needHelp")}</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              {s("policy.helpDescription")}
            </p>
            <p>
              {s("policy.visitSupport")}{" "}
              <Link to="/support" className="underline text-blue-400 hover:text-blue-300">
                {s("policy.supportPage")}
              </Link>{" "}
              {s("policy.supportPageEnd")}
            </p>
          </div>
        </section>

        <p className="text-sm text-gray-400 mt-8">
            {s("policy.lastUpdated")}
          </p>
      </div>
    </div>
  );
}

export default PolicyPage;

