import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export function PaymentSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing'); // processing, success, error

    useEffect(() => {
        const sessionId = new URLSearchParams(location.search).get('session_id');

        if (sessionId) {
            // Let's assume there's a backend endpoint to verify the session
            api.post('/payment/success', { session_id: sessionId })
                .then(response => {
                    setStatus('success');
                    // Redirect to account page after a few seconds
                    setTimeout(() => navigate('/account'), 5000);
                })
                .catch(error => {
                    console.error('Error verifying payment session:', error);
                    setStatus('error');
                });
        } else {
            // No session ID found in the URL
            setStatus('error');
        }
    }, [location, navigate]);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center text-center p-4">
            {status === 'processing' && (
                <>
                    <h1 className="text-4xl font-bold mb-4">Processing Your Payment...</h1>
                    <p className="text-lg text-gray-400">Please wait while we confirm your transaction.</p>
                </>
            )}
            {status === 'success' && (
                <>
                    <h1 className="text-4xl font-bold mb-4 text-green-500">Payment Successful!</h1>
                    <p className="text-lg text-gray-400 mb-8">
                        Welcome to FluxTrade! Your subscription is now active. You will be redirected to your account page shortly.
                    </p>
                    <Link to="/account" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                        Go to My Account
                    </Link>
                </>
            )}
            {status === 'error' && (
                <>
                    <h1 className="text-4xl font-bold mb-4 text-red-500">Payment Error</h1>
                    <p className="text-lg text-gray-400 mb-8">
                        There was an issue with your payment. Please try again or contact support if the problem persists.
                    </p>
                    <Link to="/pricing" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                        Return to Pricing
                    </Link>
                </>
            )}
        </div>
    );
} 