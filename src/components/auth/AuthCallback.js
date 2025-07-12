import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // remove the leading '#'
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      
      if (accessToken) {
        Cookies.set('token', accessToken, { secure: true, sameSite: 'Strict' });
      }
      if (refreshToken) {
        Cookies.set('refresh_token', refreshToken, { secure: true, sameSite: 'Strict' });
      }

      // Redirect to a protected route, e.g., account page
      navigate('/account');
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}; 