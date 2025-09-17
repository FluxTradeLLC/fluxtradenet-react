import React from 'react';

export function AffiliatesPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold mb-4 text-center">FluxTrade Affiliate Program</h1>
        <p className="text-lg text-gray-300 mb-10 text-center max-w-3xl mx-auto">
          Earn recurring commissions by promoting FluxTrade. Our program is simple, transparent, and creator-friendly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-4xl font-extrabold text-indigo-400 mb-2">30%</p>
            <p className="text-gray-300">Recurring commission on all subscription payments you refer.</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">Net-60 Payouts</p>
            <p className="text-gray-300">Paid out via PayPal on a net-60 schedule.</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">Use Our Assets</p>
            <p className="text-gray-300">Use our logo, site media, and videos in your promos.</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">Free trial</p>
            <p className="text-gray-300">We offer a free 30-day trial to our customers</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">Powerful tools</p>
            <p className="text-gray-300">Our suite of tools has been built from the ground up</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">Growing community</p>
            <p className="text-gray-300">Our free Discord allows traders to share and collaborate</p>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <a
            href="https://fluxtrade.promotekit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300"
          >
            Join the Affiliate Program
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Program Details</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Commission: <span className="font-semibold text-white">30% recurring</span> on subscriptions you refer.</li>
            <li>Payout terms: <span className="font-semibold text-white">Net-60</span> via PayPal.</li>
            <li>Attribution handled by PromoteKit; your referrals are tracked automatically.</li>
            <li>
              Marketing assets: You may use any materials from our site, including our logo and videos on our channel
              <a className="text-indigo-400 hover:text-indigo-300 ml-1" href="https://www.youtube.com/@FluxTrade_LLC" target="_blank" rel="noopener noreferrer">@FluxTrade_LLC</a>.
            </li>
            <li>
              To get started, create your affiliate account here: 
              <a className="text-indigo-400 hover:text-indigo-300 ml-1" href="https://fluxtrade.promotekit.com" target="_blank" rel="noopener noreferrer">fluxtrade.promotekit.com</a>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
