import React from "react";
import { s } from "../strings.js";

export function DisclaimersPage() {
    return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-5xl font-extrabold mb-8 text-center">
          {s("footer.disclaimers")}
        </h1>

        {/* General Trading Disclaimers Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {s("footer.disclaimers")}
          </h2>
          <div className="space-y-6 text-gray-300">
            <p>{s("footer.disclaimer1")}</p>
            <p>{s("footer.disclaimer2")}</p>
          </div>
        </section>

        {/* Wins Section Disclaimer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {s("footer.testimonialDisclosure")}
          </h2>
          <div className="space-y-6 text-gray-300">
            <p>{s("landing.winsDisclaimer")}</p>
          </div>
        </section>

        {/* Streaming Disclaimer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {s("footer.liveTradingRoomDisclosure")}
          </h2>
          <div className="space-y-6 text-gray-300">
            <p>{s("streaming.disclaimer")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DisclaimersPage;
