import React from 'react';

export function SupportPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-6">Support</h1>
        <p className="text-gray-300 mb-4">
          For support inquiries, please email <a href='mailto:hello@fluxtrade.net' className='underline'>hello@fluxtrade.net</a>.
        </p>
        <p className="text-gray-300 mb-8">
          You can also join our Discord community for faster help and announcements.
        </p>
        <div className="flex justify-center w-full">
          <iframe title="Discord" src="https://discord.com/widget?id=1296225730568388640&theme=dark" width="350" height="500" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;


