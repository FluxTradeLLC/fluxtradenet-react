import React from 'react';
import { Link } from 'react-router-dom';

export function PaymentPostPurchasePage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-extrabold mb-4 text-green-400">Congrats, your purchase is complete! 🎉</h1>
            <p className="text-lg text-gray-300 mb-6 max-w-xl">
                Thank you for joining FluxTrade! Your subscription is now active and you have full access to all premium features. Check your email for a receipt and onboarding instructions. If you have any questions, our support team is here to help.
            </p>
            <p className="text-md text-gray-400 mb-8 max-w-lg">
                You can manage your account, view your subscription, and get started with our tools from your account dashboard.
            </p>
            <Link to="/account" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
                Go to My Account
            </Link>
        </div>
    );
} 