import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // remove the leading '#'
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      
      const cookieOptions = {
        secure: true,
        sameSite: 'Lax',
      };

      if (process.env.NODE_ENV === 'production') {
        cookieOptions.domain = '.fluxtrade.net';
      }

      if (accessToken) {
        Cookies.set('token', accessToken, cookieOptions);
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken && decodedToken.email) {
          localStorage.setItem('userEmail', decodedToken.email);
        }
      }
      if (refreshToken) {
        Cookies.set('refresh_token', refreshToken, cookieOptions);
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