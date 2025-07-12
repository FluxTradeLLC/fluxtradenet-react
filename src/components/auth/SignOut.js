import React, { useState } from 'react';
import api from '../../api/axios';
import Cookies from 'js-cookie';

export const SignOut = () => {
  const [error, setError] = useState('');

  const handleSignOut = async () => {
    setError('');
    try {
      await api.post('/logout');
      Cookies.remove('token');
      alert('Logged out!');
    } catch (err) {
      setError('Logout failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSignOut}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Sign Out
      </button>
    </div>
  );
}; 