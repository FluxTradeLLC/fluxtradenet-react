import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { SignUp } from '../components/auth/SignUp';
import { SignIn } from '../components/auth/SignIn';
import { SignOut } from '../components/auth/SignOut';
import api from '../api/axios';

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [hasSession, setHasSession] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setHasSession(!!token);
    if (token) {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
      if (email) {
        const fetchSubscriptionStatus = async () => {
          try {
            const { data } = await api.get(
              `/payment/subscription-status/${email}`
            );
            setIsPaid(data.paid);
          } catch (error) {
            console.error('Error fetching subscription status:', error);
          }
        };
        fetchSubscriptionStatus();
      }
    }
  }, []);

  const handleCustomerPortal = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const { data } = await api.post('/payment/customer-portal', { email });
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating customer portal session:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12">Account</h1>
      {hasSession ? (
        <div className="max-w-md mx-auto text-center">
          {userEmail && (
            <p className="text-lg mb-4">Logged in as: {userEmail}</p>
          )}
          <div className="mt-12 flex justify-center items-center">
            <button
              onClick={handleCustomerPortal}
              className={`mr-[20px] px-4 py-2 rounded ${
                isPaid
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
              disabled={!isPaid}
            >
              Customer Settings
            </button>
            <SignOut />
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('signin')}
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === 'signin'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`w-1/2 py-4 text-center font-semibold ${
                activeTab === 'signup'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>
          <div className="pt-8">
            {activeTab === 'signin' ? <SignIn /> : <SignUp />}
          </div>
        </div>
      )}
    </div>
  );
}; 