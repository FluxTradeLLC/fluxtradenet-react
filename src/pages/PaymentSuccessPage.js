import React from 'react';
import { Link } from 'react-router-dom';

export function PaymentSuccessPage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-bold mb-4 text-green-500">Payment Successful!</h1>
                <p className="text-lg text-gray-400 mb-8">
                    Welcome to FluxTrade! Your subscription is now active. You will be redirected to your account page shortly.
                </p>
                <Link to="/account" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                    Go to My Account
                </Link>
            </div>
        </div>
    );
}