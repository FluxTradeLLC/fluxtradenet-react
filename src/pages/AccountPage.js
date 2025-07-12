import React, { useState } from 'react';
import { SignUp } from '../components/auth/SignUp';
import { SignIn } from '../components/auth/SignIn';
import { SignOut } from '../components/auth/SignOut';

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Account Management</h1>
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
      <div className="mt-12">
        <SignOut />
      </div>
    </div>
  );
}; 