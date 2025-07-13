import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { SignUp } from '../components/auth/SignUp';
import { SignIn } from '../components/auth/SignIn';
import { SignOut } from '../components/auth/SignOut';
import { Header } from '../components/layout/Header';
import api from '../api/axios';

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setHasSession(!!token);
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
      <Header />
      <h1 className="text-4xl font-bold text-center mb-12">Account</h1>
      {hasSession ? (
        <div className="mt-12 text-center">
          <SignOut />
          <button
            onClick={handleCustomerPortal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Customer Settings
          </button>
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