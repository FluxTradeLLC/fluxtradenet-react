import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Cookies from 'js-cookie';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate();
  const cookieOptions = {
    path: '/',
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
    ...(process.env.NODE_ENV === 'production' ? { domain: '.fluxtrade.net' } : {})
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/users/login', { email, password });
      Cookies.set('token', res.data.token, { ...cookieOptions, expires: 7 });
      localStorage.setItem('userEmail', email);
      // alert('Signed in!');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Sign in failed');
    }
  };

  const handleGoogleSubmit = async () => {
    setError('');
    try {
      const res = await api.get('/users/login/google');
      window.location.href = res.data.url;
    } catch (err) {
      setError(err.response?.data?.error || 'Google sign in failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-8">Sign In</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleEmailSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
      </form>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>
      <button
        onClick={handleGoogleSubmit}
        className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C42.022,34.627,44,29.692,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Sign In with Google
      </button>
    </div>
  );
}; 