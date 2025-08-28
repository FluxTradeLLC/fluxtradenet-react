import React, { useState } from 'react';
import api from '../../api/axios';
import Cookies from 'js-cookie';

export const SignOut = () => {
  const [error, setError] = useState('');

  const handleSignOut = async () => {
    setError('');
    try {
      await api.post('/users/logout');

      // Remove cookies regardless of how they were originally set
      const domainOptions = process.env.NODE_ENV === 'production'
        ? { domain: '.fluxtrade.net', path: '/' }
        : { path: '/' };
      const hostOnlyOptions = { path: '/' };

      // Attempt removal for domain cookie (production) and host-only cookie variants
      Cookies.remove('token', domainOptions);
      Cookies.remove('refresh_token', domainOptions);
      Cookies.remove('token', hostOnlyOptions);
      Cookies.remove('refresh_token', hostOnlyOptions);
      localStorage.removeItem('userEmail');

      window.location.reload()
    } catch (err) {
      setError('Logout failed');
    }
  };

  return (
    <div className="ext-center">
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